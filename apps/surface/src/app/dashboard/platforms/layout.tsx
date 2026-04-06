import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QueueUp - Dashboard",
  description:
    "Your social media command center. Plan, schedule, and automate your posts across LinkedIn, Twitter, Facebook, and more with ease.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
