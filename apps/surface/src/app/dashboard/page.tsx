import { PrimaryFlowButton } from "@/components/flow-button";
import Image from "next/image";
import { CopyPlus } from "lucide-react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarRange,
  Image as ImageIcon,
  LayoutTemplate,
  Sparkles,
} from "lucide-react";

const quickCards = [
  {
    title: "All Posts",
    description: "Review, edit, and manage every post in one place.",
    href: "/dashboard/all-posts",
    icon: ImageIcon,
    accent: "from-pink-500/15 via-rose-500/10 to-transparent",
  },
  {
    title: "Calendar",
    description: "Plan your publishing schedule with a clean timeline view.",
    href: "/dashboard/calendar",
    icon: CalendarRange,
    accent: "from-cyan-500/15 via-sky-500/10 to-transparent",
  },
  {
    title: "Platforms",
    description: "Connect and manage your social channels quickly.",
    href: "/dashboard/platforms",
    icon: LayoutTemplate,
    accent: "from-violet-500/15 via-purple-500/10 to-transparent",
  },
  {
    title: "Media Library",
    description: "Browse and reuse visuals for your next campaign.",
    href: "/dashboard/media",
    icon: ImageIcon,
    accent: "from-emerald-500/15 via-lime-500/10 to-transparent",
  },
];

export default function DashBoardOverview() {
  return (
    <main className="min-h-[80vh] w-full rounded-3xl border border-border/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),rgba(255,255,255,0.04))] p-6 shadow-sm md:p-8">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            Welcome back
          </div>

          <div className="space-y-4">
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Create, schedule, and grow your content with clarity.
            </h1>
            <p className="max-w-lg text-base text-muted-foreground md:text-lg">
              A calm, focused dashboard to manage your posts, explore your
              media, and jump into your next campaign in one click.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/post/create-post"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:scale-[1.02] hover:bg-primary/90"
            >
              Create Post
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/dashboard/all-posts"
              className="inline-flex items-center rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground transition hover:border-primary/30 hover:bg-accent"
            >
              View Recent Posts
            </Link>
          </div>

          <div className="relative h-60 w-full overflow-hidden rounded-3xl border border-border/70 bg-background/80">
            <Image
              src="/og-image.png"
              alt="Dashboard illustration"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        <aside className="rounded-3xl border border-border/70 bg-card/80 p-5 shadow-sm backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Today&apos;s flow</p>
              <h2 className="text-xl font-semibold text-foreground">
                Quick access
              </h2>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">
              Active
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {quickCards.map((card) => {
              const Icon = card.icon;

              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group rounded-2xl border border-border/70 bg-background/80 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-background"
                >
                  <div
                    className={`mb-3 rounded-2xl border border-white/5 bg-linear-to-br ${card.accent} p-3`}
                  >
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </aside>
      </section>
    </main>
  );
}
