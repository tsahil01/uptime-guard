"use client";

import { useRouter } from "next/navigation";
import { IWebsite } from "@/types/types";
import { Button } from "../ui/button";

export function WebsitesDiv({ website, index }: { website: IWebsite, index: number }) {
    const router = useRouter();

    function handleClick() {
        const id = website.id as string;
        router.push(`/dashboard/website/${id}`);
    }

    return (
        <>
            <div key={index} className='flex flex-row justify-between border rounded-xl p-9 h-16 bg-primary/5'>
                <div className="flex items-center">
                    <h3 className="text-md font-medium truncate max-w-[200px]">{website.url}</h3>
                </div>
                <div className='flex flex-row gap-4 items-center'>
                    <Button variant={'outline'} size="sm" onClick={handleClick}>
                        Open
                    </Button>
                </div>
            </div>
        </>
    )
}