"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { DashboardMain } from "@/components/dashboard/dashboard-main";
import axios from "axios";
import { backendUrl } from "@/lib/constants";
import { IWebsite } from "@/types/types";
import { useToast } from "@/hooks/use-toast";

async function fetchWebsites() {
  try {
    const res = await axios.get(`${backendUrl}/api/website/userAll`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;

  } catch (error) {
    console.error("Error fetching websites:", error);
    return null;
  }
}

export default function Dashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [websites, setWebsites] = useState<IWebsite[]>([]);
  async function runner() {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }
    const res = await fetchWebsites();
    if (res) {
      setWebsites(res.websites);
    }
    if(res == null){
      toast({
        title: "Error",
        description: "Please try again",
      });
    }

  }

  useEffect(() => {
    runner();
  }, [router]);

  return (
    <main>
      <Navbar />
      <DashboardMain websites={websites} />
    </main>
  );
}
