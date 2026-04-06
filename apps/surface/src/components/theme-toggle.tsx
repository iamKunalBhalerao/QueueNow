"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useHasHydrated } from "@/hooks/use-hydrated";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

const isHydrated = useHasHydrated();

  if (!isHydrated) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};

export default ThemeToggle;
