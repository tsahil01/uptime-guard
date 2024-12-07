"use client";

import { Activity, Shield, Bell, Gauge } from "lucide-react";
import Link from "next/link";

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
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:text-white lg:flex">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
      
      <div className="relative z-20">
        <Link href="/" className="flex items-center text-lg font-medium">
          <Activity className="h-6 w-6 mr-2" />
          <span>UptimeGuard</span>
        </Link>
      </div>
      
      <div className="relative z-20 mt-16">
        <blockquote className="space-y-2">
          <p className="text-4xl font-bold">Keep Your Sites Running</p>
          <p className="text-lg text-primary-foreground/80">
            Simple, reliable monitoring for modern web applications
          </p>
        </blockquote>
      </div>

      <div className="relative z-20 mt-auto">
        <div className="space-y-8">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start space-x-3">
              <feature.icon className="h-6 w-6 text-white/80 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-1">{feature.title}</h4>
                <p className="text-sm text-white/70">{feature.description}</p>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}