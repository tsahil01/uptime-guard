import { Plus, Zap } from 'lucide-react';
import { Button } from "../ui/button";
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
} from "@/components/ui/dialog";
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { backendUrl } from '@/lib/constants';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function DashboardMain({ websites }: { websites: IWebsite[] }) {
    const [url, setUrl] = useState<string>("");
    const { toast } = useToast();

    const isValidUrl = (input: string) => {
        const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return regex.test(input);
    };

    async function addWebsite(url: string) {
        if (!isValidUrl(url)) {
            toast({
                title: "Invalid URL",
                description: "Please enter a valid URL.",
            });
            return;
        }

        console.log("Adding website:", url);
        try {
            const res = await axios.post(`${backendUrl}/api/website/create`, {
                url,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            toast({
                title: "Website added",
                description: "Website added successfully",
            });

            return res.data;
        } catch (error) {
            toast({
                title: "Error adding website",
                description: "Please try again",
            });
            return null;
        }
    }

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
                                            Enter URL
                                        </Label>
                                        <Input
                                            id="url"
                                            className="col-span-3"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            required
                                            pattern="^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$" // URL validation pattern
                                            placeholder="https://example.com"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        onClick={async () => {
                                            await addWebsite(url);
                                        }}
                                    >
                                        Save changes
                                    </Button>
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
            </div>
        </section>
    );
}
