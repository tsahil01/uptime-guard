"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export function Hero() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleDemoRedirect = () => {
    router.push('/login?email=demo@demo.com&password=demo1234');
  };

  return (
    <div className="relative">
      <div className="container flex flex-col items-center justify-center py-24 text-center">
        <div className="mx-auto max-w-3xl space-y-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Monitor Your Websites with Confidence
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
            Keep track of your website's uptime, performance, and health with our powerful monitoring solution. Get instant alerts when things go wrong.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isLoggedIn ? (
              <Link href="/dashboard"
                prefetch>
                <Button size="lg">
                  Start Monitoring
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Link href="/signup"
                prefetch>
                <Button size="lg">
                  Start Monitoring
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
            <Button size="lg" variant="outline" onClick={handleDemoRedirect}>
              View Live Demo
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 h-full w-full bg-primary/5 dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_14px]" />
    </div>
  );
}