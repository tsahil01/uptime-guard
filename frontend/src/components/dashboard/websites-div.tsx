import { AlertTriangle, Check } from "lucide-react";
import { Button } from "../ui/button";
import { WebsiteInterface } from "@/types/website-types";

export function WebsitesDiv({ website, index }: { website: WebsiteInterface, index: number }) {
    return (
        <>
            <div key={index} className='flex flex-row justify-between border rounded-xl p-5 h-16'>
                <div className="flex items-center">
                    <h3 className="text-md font-medium truncate max-w-[200px]">{website.name}</h3>
                </div>
                <div className='flex flex-row gap-4 items-center'>
                    {website.status === 'up' ? (
                        <Check size={24} className="p-1 border rounded-full bg-green-100 text-green-600" />
                    ) : (
                        <AlertTriangle size={24} className="p-1 border rounded-full bg-red-100 text-red-600" />
                    )}
                    <Button variant={'outline'} size="sm">
                        Check Status
                    </Button>
                </div>
            </div>
        </>
    )
}