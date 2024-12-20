import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const features = [
  {
    title: "Latest Status",
    description: "Get the latest status of your website.",
  },
  {
    title: "Status Codes",
    description: "Get the status codes of your website.",
  },
  {
    title: "Response Time",
    description: "Get the response time of your website.",
  },
  {
    title: "Check Interval",
    description: "Check your website every minute.",
  },
];

export function ApplicationPreview() {
  return (
    <div className="bg-primary/5 dark:bg-black">
      <section className="py-20 md:pl-20 px-6 md:px-0">
        <div className="flex md:flex-row flex-col gap-10 justify-between items-center">

          {/* Mobile Image */}
          <div className="md:w-full bg-primary/10 rounded-xl p-3 md:hidden block">
            <Image
              src="/dashboardFull.png"
              alt="Dashboard"
              className="w-full h-full object-cover"
              width={1000}
              height={1000}
            />
          </div>

          {/* Features Section */}
          <div className="md:text-left text-center my-auto py-10">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Monitor Your Website's Uptime and Performance
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              UptimeGuard is a website monitoring tool that helps you monitor your website's uptime and performance.
            </p>

            <div className="flex flex-col gap-6 mt-10 text-left ml-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-4"
                >
                  <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0 my-auto" />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-primary/80">
                      {feature.title}
                    </h3>
                    <p className="text-primary/50">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Image */}
          <div className="md:w-2/3 bg-primary/10 rounded-y-xl py-3 pl-3 hidden md:block">
            <Image
              src="/dashboard.png"
              alt="Dashboard"
              className="w-full h-full object-cover"
              width={1000}
              height={1000}
            />
          </div>

        </div>
      </section>
    </div>
  );
}
