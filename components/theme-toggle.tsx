"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const themes = [
    { name: "system", icon: <Monitor className="h-4 w-4" /> },
    { name: "light", icon: <Sun className="h-4 w-4" /> },
    { name: "dark", icon: <Moon className="h-4 w-4" /> },
  ];

  return (
    <div className="relative flex h-6 items-center justify-evenly rounded-full bg-gray-100 p-1 dark:bg-gray-900">
      {themes.map(({ name, icon }) => (
        <button
          key={name}
          className={cn(
            "flex h-5 w-6 items-center justify-center rounded-full transition-all duration-200",
            mounted && theme === name && "bg-white dark:bg-gray-800"
          )}
          onClick={() => setTheme(name)}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
