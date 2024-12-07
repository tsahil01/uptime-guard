import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative">
      <div className="container flex flex-col items-center justify-center py-24 text-center">
        <div className="mx-auto max-w-3xl space-y-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Monitor Your Websites with{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Confidence
            </span>
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
            Keep track of your website's uptime, performance, and health with our powerful monitoring solution. Get instant alerts when things go wrong.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">
                Start Monitoring
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">View Live Demo</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 -z-10 h-full w-full bg-primary/5 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
    </div>
  );
}