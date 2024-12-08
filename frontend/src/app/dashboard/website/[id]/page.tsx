"use client";

import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { SinglePageMonitor } from "@/components/dashboard/single-page-monitor";
import axios from "axios";
import { backendUrl } from "@/lib/constants";
import { useEffect, useState } from "react";
import { IWebsite } from "@/types/types";
import { useToast } from "@/hooks/use-toast";

async function fetchWebsite(id: string) {
  try {
    const res = await axios.get(`${backendUrl}/api/website/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching website:", error);
    return null;
  }
}

export default function WebsitePage() {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [website, setWebsite] = useState<IWebsite | null>(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.toast({
        title: "Not authenticated",
        description: "Please sign in to view this page",
      });
      router.push("/");
      return;
    }

    fetchWebsite(`${id}`).then((res) => {
      if (res) {
        setWebsite(res.website);
      }
      setLoading(false);
    });
  }, [router]);

  return (
    <main>
      <Navbar />
      {loading ? (
        <div>Loading...</div>
      ) : (
        website && <SinglePageMonitor website={website} />
      )}
    </main>
  );
}
