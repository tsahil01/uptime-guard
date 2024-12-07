import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <main className="border">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
    </main>
  );
}