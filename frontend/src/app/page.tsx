import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/layout/navbar";
import { Testimonials } from "@/components/sections/testimonials";
import { LetsGo } from "@/components/sections/letsgo";
import { Metadata } from "next";
import { ApplicationPreview } from "@/components/sections/app-preview";
import { NotificaitonSection } from "@/components/sections/notification";

export const metadata: Metadata = {
  title: "UptimeGuard - Monitor your website's uptime",
  description: "UptimeGuard is a website monitoring tool that helps you monitor your website's uptime and performance.",
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <ApplicationPreview />
      <NotificaitonSection />
      <Testimonials />
      <LetsGo />
    </main>
  );
}