"use client";

import { Activity, Shield, Bell, Gauge } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Shield,
    title: "Proactive Monitoring",
    description: "24/7 website monitoring with instant downtime detection",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Get notified via email, or Telegram when issues arise",
  },
  {
    icon: Gauge,
    title: "Performance Metrics",
    description: "Track response times and availability in real-time",
  },
];

export function AuthSidePanel() {
  return (
    <>
      <div className="relative hidden h-full flex-col bg-slate-950 p-10 text-white lg:flex overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-900 to-sky-950 opacity-50" />
        </div>

        <div className="relative z-20">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-lg font-medium hover:opacity-90 transition-opacity"
          >
            <Activity className="h-6 w-6" />
            <span className="font-bold tracking-tight">UptimeGuard</span>
          </Link>
        </div>

        <div className="relative z-20 mt-16">
          <blockquote className="space-y-4">
            <p className="text-4xl font-bold tracking-tight">
              Keep Your Sites Running
            </p>
            <p className="text-lg text-blue-100/90">
              Simple, reliable monitoring for modern web applications
            </p>
          </blockquote>
        </div>

        <div className="relative z-20 mt-auto">
          <div className="space-y-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start space-x-4 rounded-lg p-3 transition-colors",
                  "hover:bg-white/5"
                )}
              >
                <feature.icon className="h-6 w-6 text-blue-200 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1 text-blue-50">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-blue-200/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-primary/5 dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
    </>

  );
}