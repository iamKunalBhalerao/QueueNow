import Link from "next/link";
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function NotFound() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-1 min-h-[70vh] flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-extrabold tracking-tight lg:text-7xl mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Return to Dashboard
        </Link>
      </div>
    </SidebarProvider>
  );
}
