import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Clock } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format } from "date-fns";
import { StatusData } from "@/types/types";

export function UptimeChart({ history }: { history: StatusData[] }) {

  const data = history.map((entry) => ({
    timestamp: new Date(entry.lastChecked).getTime(),
    uptime: entry.code === 200 ? 100 : 0,
    responseTime: entry.responseTime,
  }));

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-primary/5">
          <Clock className="h-5 w-5 text-primary" />
          <CardTitle className="text-sm font-medium">
            Uptime & Response Time Chart
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-[300px] w-full flex items-center justify-center">
            <span className="text-muted-foreground">No data to display</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-primary/5">
        <Clock className="h-5 w-5 text-primary" />
        <CardTitle className="text-sm font-medium">
          Uptime & Response Time Chart
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="uptimeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="responseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) => format(value, "HH:mm")}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                yAxisId="left"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `${value}ms`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload) return null;
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Time
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {format(payload[0].payload.timestamp, "HH:mm")}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Uptime
                          </span>
                          <span className="font-bold text-primary">
                            {payload[0].value}%
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Response Time
                          </span>
                          <span className="font-bold text-primary">
                            {payload[1].value}ms
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="uptime"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#uptimeGradient)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="responseTime"
                stroke="hsl(var(--chart-2))"
                fillOpacity={1}
                fill="url(#responseGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[hsl(var(--chart-1))]" />
            <span className="text-sm text-muted-foreground">Uptime</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[hsl(var(--chart-2))]" />
            <span className="text-sm text-muted-foreground">Response Time</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
