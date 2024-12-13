"use client";

import { IWebsite, StatusData } from "@/types/types";
import { Button } from "../ui/button";
import { ChartNoAxesColumn, Clock, ExternalLink, Zap, Loader } from "lucide-react";
import { backendUrl } from "@/lib/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StatusCard } from "./status-card";
import { UptimeChart } from "./uptime-chart";

const statusItems = [
  { title: "Current Status", icon: ChartNoAxesColumn },
  { title: "Status Code", icon: Zap },
  { title: "Response Time", icon: Clock },
  { title: "Last Checked", icon: Clock },
];

async function checkStatus(website: IWebsite) {
  try {
    const res = await axios.get(`${backendUrl}/api/website/check`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: website,
    });
    // console.log("Website checked:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error checking website:", error);
    return null;
  }
}

export function SinglePageMonitor({ website }: { website: IWebsite }) {
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [history, setHistory] = useState<StatusData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function runner() {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    setLoading(true);
    try {
      const res = await checkStatus(website);
      // console.log("Response:", res);
      const wsData = res.data;
      const history = res.history;
      // console.log("History:", history);
      // console.log("Website Data:", wsData.data);

      if (res) {
        setStatusData({
          status: wsData.data.status,
          code: wsData.data.code,
          responseTime: wsData.data.responseTime,
          lastChecked: wsData.data.lastChecked,
        });
        setHistory(history.data);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    runner();
  }, []);

  return (
    <section className="container max-w-7xl mx-auto py-10 space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full">
          <h2 className="text-2xl font-semibold tracking-tight">{website.url}</h2>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => window.open(website.url, "_blank")}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
        <Button
          className="w-full md:w-auto"
          size="lg"
          onClick={runner}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            "Check Now"
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statusItems.map((item) => (
          <StatusCard
            key={item.title}
            title={item.title}
            icon={item.icon}
            status={statusData}
            loading={loading}
          />
        ))}
      </div>

      <UptimeChart history={history} />
    </section>
  );
}