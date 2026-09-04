"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import Logo_dark from "@/public/logo_dark.svg";
import Logo_light from "@/public/logo_light.svg";

export function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <footer className="ftl:flex-row ftl:space-y-0 z-10 mt-auto flex flex-col items-center justify-between space-y-4 rounded-t-4xl border-t border-muted-foreground bg-card px-4 py-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
      <div className="flex flex-wrap items-center justify-center text-muted-foreground">
        <Link href="/" className="ftl:inline hidden py-1">
          <Image
            className="ftl:inline hidden"
            src={mounted && resolvedTheme === "dark" ? Logo_dark : Logo_light}
            alt="Logo"
            width={32}
            height={32}
            priority
          />
        </Link>
        <Link href="/" className="px-4 py-2 text-sm hover:text-primary lg:px-6">
          Home
        </Link>
      </div>
      <ThemeToggle />
    </footer>
  );
}
