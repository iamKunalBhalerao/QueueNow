import { ReactNode } from "react";

interface DashboardContentContainerProps {
  children: ReactNode;
}

export default function DashboardContentContainer({
  children,
}: DashboardContentContainerProps) {
  return (
    <>
      <div className="min-h-screen w-full bg-background flex flex-col items-center">
        <div className="w-full max-w-7xl mx-auto flex-1 p-2">{children}</div>
        <footer className="border-t border-gray-300 w-full py-6 mt-auto">
          <p className="text-center text-gray-600">
            &copy; 2026 QueueUp. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
