"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const THEME_CYCLE = ["dark", "light"] as const;

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  const icon = mounted
    ? { dark: <Moon className="h-6 w-6" />, light: <Sun className="h-6 w-6" /> }[resolvedTheme ?? "dark"]
    : <Moon className="h-6 w-6" />;

  return (
    <Button variant="ghost" size="icon" onClick={cycleTheme}>
      {icon}
      <span className="sr-only">Cambia tema</span>
    </Button>
  );
}
