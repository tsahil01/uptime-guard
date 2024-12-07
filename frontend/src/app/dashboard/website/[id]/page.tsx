"use client";

import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { SinglePageMonitor } from "@/components/dashboard/single-page-monitor";
import axios from "axios";
import { backendUrl } from "@/lib/constants";
import { useEffect, useState } from "react";
import { IWebsite } from "@/types/types";

async function fetchWebsite(id: string) {
  try {
    // url: localhost:3000/api/website/:id
    const res = await axios.get(`${backendUrl}/api/website/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching website:", error);
    alert("Error fetching website");
    return null;
  }
}

export default function WebsitePage() {
  const [loading, setLoading] = useState(true);
  const [website, setWebsite] = useState<IWebsite | null>(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized");
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
