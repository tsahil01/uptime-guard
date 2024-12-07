import { Plus, Zap } from 'lucide-react';
import { Button } from "../ui/button";
import { CurrentStatusCard } from './current-status-card';
import { WebsitesDiv } from './websites-div';
import { IWebsite } from '@/types/types';

export function DashboardMain({ websites }: { websites: IWebsite[] }) {
    return (
        <section className="container py-10 space-y-8">
            <div className="flex md:flex-row flex-col gap-4">
                <div className="flex-grow flex flex-col gap-3">
                    <div className="flex flex-row justify-between">
                        <h2 className="text-2xl font-bold tracking-tight mb-4 text-left">
                            Monitors
                        </h2>
                        <Button className="bg-blue-500">
                            <Plus size={16} className="mr-1" />
                            New Monitor
                        </Button>
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

                <CurrentStatusCard up={2} down={2} />
            </div>
        </section>
    );
}

