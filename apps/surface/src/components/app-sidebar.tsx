"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import Link from "next/link";
import DashboardNavigation from "@/components/nav-main";
import { dashboardRoutes } from "@/lib/dashboardData";
import { CopyPlus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NeuralButton } from "@/components/ui/neural-button";
import DropdownMenuUser from "@/components/user-profile";

export default function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  return (
    <>
      <Sidebar variant="floating" collapsible="icon">
        <SidebarHeader
          className={cn(
            "flex md:pt-3.5",
            isCollapsed
              ? "flex-row items-center justify-between gap-y-4 md:flex-col md:items-start md:justify-start"
              : "flex-row items-center justify-between",
          )}
        >
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            {!isCollapsed && (
              <span className="font-semibold text-black dark:text-white">
                QueueUp
              </span>
            )}
          </Link>

          <motion.div
            key={isCollapsed ? "header-collapsed" : "header-expanded"}
            className={cn(
              "flex items-center gap-2",
              isCollapsed ? "flex-row md:flex-col-reverse" : "flex-row",
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <SidebarTrigger />
          </motion.div>
        </SidebarHeader>

        <SidebarSeparator />

        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              key={isCollapsed ? "button-collapsed" : "button-expanded"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mx-2"
            >
              <NeuralButton className="w-full">
                {isCollapsed ? <CopyPlus /> : "Connect Platform"}
              </NeuralButton>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Connect Platform</p>
          </TooltipContent>
        </Tooltip>

        <SidebarSeparator />

        <SidebarContent className="gap-4 px-2 py-4">
          <DashboardNavigation routes={dashboardRoutes} />
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenuUser />
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
