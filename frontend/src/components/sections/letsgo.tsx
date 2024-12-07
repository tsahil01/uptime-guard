
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


export function LetsGo() {
    return (
        <div className="bg-primary/5 dark:bg-black">
            <section className="container py-24 space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">
                        What are you waiting for?
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Get started today and take control of your website's uptime and performance with our powerful monitoring solution.

                    </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" asChild>
                        <Link href="/signup">
                            Start Monitoring
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/demo">View Live Demo</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
