import { StatusCardProps } from "@/types/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ArrowUp, ArrowDown, Bell } from "lucide-react";

export function StatusCard({ title, icon: Icon, status, loading }: StatusCardProps) {
  const getStatusDisplay = () => {
    if (loading) {
      return (
        <div className="h-32 animate-pulse bg-muted rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground">Loading...</span>
        </div>
      );
    }

    switch (title) {
      case "Current Status":
        return (
          <div className="flex flex-col gap-2 mt-6">
            <div className="flex items-center gap-2">
              {status?.status === "UP" ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-500 font-semibold">
                  <ArrowUp className="h-5 w-5" />
                  <span>Up</span>
                </div>
              ) : status?.status === "DOWN" ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 font-semibold">
                  <ArrowDown className="h-5 w-5" />
                  <span>Down</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-500 font-semibold">
                  <Bell className="h-5 w-5" />
                  <span>Unknown</span>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {status?.status === "UP" ? "Currently up for 8+ hours" : 
               status?.status === "DOWN" ? "Down for 8+ hours" : 
               "Status unknown"}
            </p>
          </div>
        );

      case "Last Checked":
        return (
          <div className="flex flex-col gap-2 mt-6">
            <h3 className="text-2xl font-bold">{
              status?.lastChecked ? new Date(status.lastChecked).toLocaleTimeString() : "—"
              }</h3>
            <p className="text-sm text-muted-foreground">Checked every 5 minutes</p>
          </div>
        );

      case "Status Code":
        return (
          <div className="flex flex-col gap-2 mt-6">
            <h3 className="text-2xl font-bold">{status?.code || "—"}</h3>
            <p className="text-sm text-muted-foreground">
              {status?.code === 200 ? "OK" :
               status?.code === 404 ? "Not Found" :
               status?.code === 500 ? "Internal Server Error" :
               "Unknown Status"}
            </p>
          </div>
        );

      case "Response Time":
        return (
          <div className="flex flex-col gap-2 mt-6">
            <h3 className="text-2xl font-bold">{status?.responseTime || "—"}</h3>
            <p className="text-sm text-muted-foreground">Response time in milliseconds</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-primary/5">
        <Icon className="h-5 w-5 text-primary" />
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>{getStatusDisplay()}</CardContent>
    </Card>
  );
}