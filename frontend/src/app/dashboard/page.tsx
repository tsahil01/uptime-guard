import { Navbar } from "@/components/layout/navbar";
import { DashboardMain } from "@/components/dashboard/dashboard-main";

export default function Home() {
  return (
    <main>
      <Navbar />
      <DashboardMain/>
    </main>
  );
}