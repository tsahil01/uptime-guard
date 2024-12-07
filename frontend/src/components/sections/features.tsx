import { Shield, Gauge, Bell, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "24/7 Monitoring",
    description: "Continuous monitoring of your websites with real-time status updates.",
    icon: Clock,
  },
  {
    title: "Instant Alerts",
    description: "Get notified immediately when your sites experience downtime.",
    icon: Bell,
  },
  {
    title: "5 Minute Intervals",
    description: "Monitor your websites every minute to ensure they are always up.",
    icon: Gauge,
  },
  {
    title: "Secure & Reliable",
    description: "We take security seriously, ensuring your data is safe and secure.",
    icon: Shield,
  },
];

export function Features() {
  return (
    <section className="container py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Everything you need to keep your sites running
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive monitoring tools to ensure your websites are always available and performing at their best.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Card key={feature.title} className="border-2">
            <CardHeader>
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}