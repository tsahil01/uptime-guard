import { Activity, Check, AlertTriangle, Plus, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { CurrentStatusCard } from './current-status-card';
import { WebsitesDiv } from './websites-div';
import { WebsiteInterface } from '@/types/website-types';

export function DashboardMain() {
    const websites: WebsiteInterface[] = [
        {
            name: 'https://www.google.com',
            url: 'https://www.google.com',
            status: 'up',
            uptime: '100%',
            responseTime: '100ms',
            lastChecked: '2021-09-01T00:00:00Z',
        },
        {
            name: 'https://www.facebook.com',
            url: 'https://www.facebook.com',
            status: 'down',
            uptime: '0%',
            responseTime: '0ms',
            lastChecked: '2021-09-01T00:00:00Z',
        },
        {
            name: 'https://www.twitter.com',
            url: 'https://www.twitter.com',
            status: 'up',
            uptime: '100%',
            responseTime: '100ms',
            lastChecked: '2021-09-01T00:00:00Z',
        },
        {
            name: 'https://www.instagram.com',
            url: 'https://www.instagram.com',
            status: 'down',
            uptime: '0%',
            responseTime: '0ms',
            lastChecked: '2021-09-01T00:00:00Z',
        },
    ];

    return (
        <section className="container py-10 space-y-8">
            <div className="flex md:flex-row flex-col gap-4">
                <div className="flex-grow flex flex-col gap-3">
                    <div className="flex flex-row justify-between">
                        <h2 className="text-2xl font-bold tracking-tight mb-4 text-left">
                            Monitors
                        </h2>
                        <Button className="bg-blue-600">
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

