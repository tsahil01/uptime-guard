import { IWebsite } from "@/types/types";
import { Button } from "../ui/button";
import { ArrowUp, Bell, ChartNoAxesColumn, Clock, ExternalLink, Zap, Loader } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { backendUrl } from "@/lib/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const items = [
  { title: "Current Status", icon: ChartNoAxesColumn },
  { title: "Last Checked", icon: Clock },
  { title: "Status Code", icon: Zap },
];

async function checkStatus(website: IWebsite) {
  try {
    const res = await axios.get(`${backendUrl}/api/website/check`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: website,
    });
    return res.data;
  } catch (error) {
    console.error("Error checking website:", error);
    alert("Error checking website");
    return null;
  }
}

export function SinglePageMonitor({ website }: { website: IWebsite }) {
  const [status, setStatus] = useState<string>("");
  const [code, setCode] = useState<any>(0);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const router = useRouter();

  async function runner() {
    if (typeof window === "undefined") return; // Prevent SSR access
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized");
      router.push("/");
      return;
    }
    setLoading(true);
    const res = await checkStatus(website);
    if (res) {
        console.log(res);
      setStatus(res.data.status);
      setCode(res.data.code);
    }
    setLoading(false);
  }

  useEffect(() => {
    runner();
  }, []); // No unnecessary dependencies

  return (
    <section className="container py-10 space-y-8">
      <div className="flex md:flex-row flex-col gap-4">
        <div className="flex-grow flex flex-col gap-3">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-5">
              <h2 className="text-2xl font-medium tracking-tight text-left my-auto">{website.url}</h2>
              <Button
                className="my-auto rounded-full text-primary/50"
                variant={"outline"}
                onClick={() => window.open(website.url, "_blank")}
              >
                <ExternalLink size={48} />
              </Button>
            </div>
            <Button size={"lg"} onClick={runner} disabled={loading}>
              {loading ? <Loader size={24} className="animate-spin" /> : "Check Now"}
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row justify-between bg-primary/5">
              <item.icon className="text-primary my-auto" />
              <CardTitle className="my-auto">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {item.title === "Current Status" ? (
                  <div className="flex flex-col gap-1 mt-8">
                    <h3 className="flex flex-row gap-1 font-bold text-2xl">
                      {status === "UP" ? (
                        <>
                          <ArrowUp size={32} className="text-green-500" />
                          Up
                        </>
                      ) : status === "DOWN" ? (
                        <>
                          <Bell size={32} className="text-red-500" />
                          Down
                        </>
                      ) : (
                        <>
                          <Bell size={32} className="text-yellow-500" />
                          Unknown
                        </>
                      )}
                    </h3>
                    <p>{status === "up" ? "Current up for 8+ hours" : status === "down" ? "Down for 8+ hours" : "Unknown status"}</p>
                  </div>
                ) : item.title === "Last Checked" ? (
                  <div className="flex flex-col gap-1 mt-8">
                    <h3 className="font-bold text-2xl">Coming Soon</h3>
                    <p>Checked every 5 minutes</p>
                  </div>
                ) : item.title === "Status Code" ? (
                  <div className="flex flex-col gap-1 mt-8">
                    <h3 className="font-bold text-2xl">
                        {code}
                    </h3>
                    <p>
                        {code === 200 ? "OK" : code === 404 ? "Not Found" : code === 500 ? "Internal Server Error" : "Unknown"}
                    </p>
                  </div>
                ) : (
                  <div></div>
                )}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader className="flex flex-row justify-between bg-primary/5">
          <Clock className="text-primary my-auto" />
          <CardTitle className="my-auto">Last 24 hours</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            {/* horizontal 24 progress bars. each representing an hour */}
          </CardDescription>
        </CardContent>
      </Card>
    </section>
  );
}
