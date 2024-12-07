import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function CurrentStatusCard({ up, down }: { up: number, down: number }) {
    return <>
        <Card className="px-5 h-[250px] bg-primary/5">
            <CardHeader>
                <CardTitle>Current Status</CardTitle>
            </CardHeader>
            <CardContent className="h-[180px] flex flex-col justify-between">
                <div className="flex justify-center">
                    <Activity size={64} className="p-3 border rounded-full bg-blue-100 text-blue-600" />
                </div>
                <div className="flex flex-row gap-2 w-full justify-between">
                    <div className="flex flex-col text-center">
                        <div className="text-sm text-gray-500">Down</div>
                        <div className="text-2xl font-bold">{down}</div>
                    </div>
                    <div className="flex flex-col text-center">
                        <div className="text-sm text-gray-500">Up</div>
                        <div className="text-2xl font-bold">{up}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </>
}
