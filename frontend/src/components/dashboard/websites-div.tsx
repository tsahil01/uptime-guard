"use client";

import { useRouter } from "next/navigation";
import { IWebsite } from "@/types/types";

export function WebsitesDiv({ website, index }: { website: IWebsite, index: number }) {
    const user = "";
    const router = useRouter();

    function handleClick() {
    }

    return (
        <>
            <div key={index} className='flex flex-row justify-between border rounded-xl p-9 h-16 bg-primary/5'>
                <div className="flex items-center">
                    <h3 className="text-md font-medium truncate max-w-[200px]">{website.url}</h3>
                </div>
                {/* <div className='flex flex-row gap-4 items-center'>
                    {website.status === 'up' ? (
                        <>
                        <div className="flex flex-row gap-2 p-2 border rounded-full px-4">
                            <AudioLines size={24} className="text-green-400" />
                        </div>
                        </>
                    ) : (
                        <div className="flex flex-row gap-2 p-2 border rounded-full px-4">
                        <AudioLines size={24} className="text-red-400" />
                    </div>
                    )}
                    <Button variant={'outline'} size="sm" onClick={handleClick}>
                        Open
                    </Button>
                </div> */}
            </div>
        </>
    )
}