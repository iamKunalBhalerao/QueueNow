import React from "react";

export default function BackgroundWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-screen w-full bg-background relative">
        {/* Dual Gradient Overlay Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-linear(125% 125% at 50% 90%, var(--background) 40%, #6366f1 100%)",
          }}
        />
        <main className="relative z-10">{children}</main>
      </div>
    </>
  );
}
