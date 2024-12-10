"use client";

import { useRouter } from "next/navigation";
import { IWebsite } from "@/types/types";
import { Button } from "../ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { backendUrl } from "@/lib/constants";

export function WebsitesDiv({ website, index }: { website: IWebsite, index: number }) {
    const router = useRouter();

    function handleClick() {
        const id = website.id as string;
        router.push(`/dashboard/website/${id}`);
    }
    async function handleDelete() {
        console.log("Delete clicked");
        console.log(website.id);
        const res = await axios.delete(`${backendUrl}/api/website/${website.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log(res.data);
        router.refresh()
    }


    return (
        <>
            <div key={index} className='flex flex-row justify-between border rounded-xl p-9 h-16 bg-primary/5'>
                <div className="flex items-center">
                    <h3 className="text-md font-medium truncate max-w-[200px]">{website.url}</h3>
                </div>
                <div className='flex flex-row gap-4 items-center'>
                    <Button variant={'outline'} onClick={handleClick}>
                        Open
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'ghost'} size="sm">
                                <Edit size={16} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="hover:bg-red-400"
                                onClick={
                                    () => {
                                        handleDelete();
                                    }
                                }>
                                <Trash2 size={16} />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </>
    )
}