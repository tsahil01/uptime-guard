"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { DashboardMain } from "@/components/dashboard/dashboard-main";
import { Metadata } from "next";
import { useSetRecoilState } from "recoil";
import { websitesAtom } from "@/lib/atom/websiteAtom";
import axios from "axios";
import { backendUrl } from "@/lib/constants";
import { IWebsite } from "@/types/types";

// export const metadata: Metadata = {
//   title: "Dashboard - UptimeGuard",
//   description: "Monitor your websites and get notified when they go down",
// };


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
    alert("Error fetching websites");
    return null;
  }
}

export default function Dashboard() {
  const router = useRouter();
  const [websites, setWebsites] = useState<IWebsite[]>([]);
  async function runner() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized");
      router.push("/");
      return;
    }
    const res = await fetchWebsites();
    if (res) {
      setWebsites(res.websites);
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
