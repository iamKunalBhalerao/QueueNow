import React from "react";

export default function BackgroundWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-screen w-full bg-background relative">
        <div
          className="absolute inset-0 z-0 dark:hidden"
          style={{
            background:
              "linear-gradient(135deg, #F8BBD9 0%, #FDD5B4 25%, #FFF2CC 50%, #E1F5FE 75%, #BBDEFB 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-0 hidden dark:block"
          style={{
            background: `
       radial-gradient(ellipse 140% 50% at 15% 60%, rgba(124, 58, 237, 0.11), transparent 48%),
       radial-gradient(ellipse 90% 80% at 85% 25%, rgba(245, 101, 101, 0.09), transparent 58%),
       radial-gradient(ellipse 120% 65% at 40% 90%, rgba(34, 197, 94, 0.13), transparent 52%),
       radial-gradient(ellipse 100% 45% at 70% 5%, rgba(251, 191, 36, 0.07), transparent 42%),
       radial-gradient(ellipse 80% 75% at 90% 80%, rgba(168, 85, 247, 0.10), transparent 55%),
       #000000
     `,
          }}
        />
        <main className="relative z-10">{children}</main>
      </div>
    </>
  );
}
