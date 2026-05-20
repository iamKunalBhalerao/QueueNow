"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

export default function FeatureComingSoon() {
  const pathname = usePathname();

  const featureName = useMemo(() => {
    if (!pathname) return "New Feature";

    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] ?? "";

    if (!lastSegment) return "New Feature";

    return lastSegment
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }, [pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-8 bg-slate-50 text-slate-900">
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute inset-x-0 top-1/2 h-px bg-slate-200" />
        <span className="absolute inset-y-0 left-1/2 w-px bg-slate-200" />
      </div>

      <main className="relative z-10 w-full max-w-xl p-12 rounded-[28px] bg-white border border-slate-300 shadow-sm text-center">
        <span className="inline-flex mb-4 px-4 py-2 rounded-full border border-slate-300 text-slate-700 text-xs tracking-[0.08em] uppercase">
          Coming Soon
        </span>
        <h1 className="m-0 text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.04em]">
          {featureName} Coming Soon
        </h1>
        <p className="mx-auto my-6 max-w-2xl text-base leading-8 text-slate-600">
          We are crafting something special. Stay tuned while we polish the
          details and make it ready for you.
        </p>
        <button
          type="button"
          className="appearance-none border border-slate-300 px-7 py-4 rounded-full bg-white text-slate-900 text-base cursor-pointer transition-colors duration-200 ease-in-out hover:bg-slate-50"
        >
          Notify Me
        </button>
      </main>
    </div>
  );
}
