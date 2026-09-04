'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import Logo_dark from '@/public/logo_dark.svg';
import Logo_light from '@/public/logo_light.svg';

export function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="bg-card ftl:flex-row ftl:space-y-0 border-muted-foreground z-10 mt-auto flex flex-col items-center justify-between space-y-4 rounded-t-4xl border-t px-4 py-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
      <div className="text-muted-foreground flex flex-wrap items-center justify-center">
        <Link href="/" className="ftl:inline hidden py-1">
          <Image
            className="ftl:inline hidden"
            src={mounted && resolvedTheme === 'dark' ? Logo_dark : Logo_light}
            alt="Logo"
            width={32}
            height={32}
            priority
          />
        </Link>
        <Link href="/" className="hover:text-primary px-4 py-2 text-sm lg:px-6">
          Home
        </Link>
      </div>
      <ThemeToggle />
    </footer>
  );
}
