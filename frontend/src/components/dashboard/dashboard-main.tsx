import { Plus, Zap } from 'lucide-react';
import { Button } from "../ui/button";
import { CurrentStatusCard } from './current-status-card';
import { WebsitesDiv } from './websites-div';
import { IWebsite } from '@/types/types';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { backendUrl } from '@/lib/constants';
import { useState } from 'react';

async function addWebsite(url: string) {
    console.log("Adding website:", url);
    try {
        const res = await axios.post(`${backendUrl}/api/website/create`, {
            url,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log("Website added:", res.data);
        alert(url + " website added successfully");
        return res.data;
    } catch (error) {
        console.error("Error adding website:", error);
        alert("Error adding website");
        return null;
    }

}

export function DashboardMain({ websites }: { websites: IWebsite[] }) {
    const [url, setUrl] = useState<string>("");
    return (
        <section className="container py-10 space-y-8">
            <div className="flex md:flex-row flex-col gap-4">
                <div className="flex-grow flex flex-col gap-3">
                    <div className="flex flex-row justify-between">
                        <h2 className="text-2xl font-bold tracking-tight mb-4 text-left">
                            Monitors
                        </h2>
                        <Dialog>
                            <DialogTrigger>
                                <Button className="bg-blue-500">
                                    <Plus size={16} className="mr-1" />
                                    New Monitor
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Add a new monitor
                                    </DialogTitle>
                                    <DialogDescription>
                                        Add a new website to monitor its status.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="url" className="text-right">
                                            Name
                                        </Label>
                                        <Input id="url" className="col-span-3"
                                            onChange={
                                                (e) => {
                                                    setUrl(e.target.value);
                                                }
                                            } />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={
                                        async () => {
                                            await addWebsite(url);
                                        }
                                    }>Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                    </div>
                    {websites.length > 0 ? (
                        websites.map((website, index) => (
                            <WebsitesDiv key={index} website={website} index={index} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 border rounded-xl">
                            <Zap size={48} className="text-gray-300 mb-2" />
                            <p className="text-gray-500 text-center px-4">
                                No websites added yet. Add a website to monitor its status.
                            </p>
                        </div>
                    )}
                </div>

                {/* <CurrentStatusCard up={2} down={2} /> */}
            </div>
        </section>
    );
}

