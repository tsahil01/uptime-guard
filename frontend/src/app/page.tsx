import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/layout/navbar";
import { Testimonials } from "@/components/sections/testimonials";
import { LetsGo } from "@/components/sections/letsgo";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <LetsGo />
    </main>
  );
}