import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Websites Monitored", value: "100,000+" },
  { label: "Total Uptime Checks", value: "1B+" },
  { label: "Alert Response Time", value: "<30s" },
  { label: "Customer Satisfaction", value: "99.9%" },
];

export function Stats() {
  return (
    <section className="container py-16 border-t">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-2">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}