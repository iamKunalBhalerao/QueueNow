import DashboardContentContainer from "@/components/dashboard-content-container";
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QueueUp - Dashboard",
  description:
    "Your social media command center. Plan, schedule, and automate your posts across LinkedIn, Twitter, Facebook, and more with ease.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger size={"icon-lg"} className="md:hidden p-4 shadow bg-blue-600 text-white absolute top-1 left-1" />
      <DashboardContentContainer>{children}</DashboardContentContainer>
    </SidebarProvider>
  );
}
