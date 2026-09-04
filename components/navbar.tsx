"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Logo_dark from "@/public/logo_dark.svg";
import Logo_light from "@/public/logo_light.svg";

export function Navbar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const cartItemCount = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );
  const setDrawerOpen = useCartStore((state) => state.setDrawerOpen);
  const setDrawerView = useCartStore((state) => state.setDrawerView);

  const handleCartClick = () => {
    setDrawerView("cart");
    setDrawerOpen(true);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-10 mb-4 flex items-center justify-between rounded-b-4xl border-b border-muted-foreground bg-card px-4 py-2 sm:px-6 md:px-8 lg:px-12 xl:px-24">
      <Link href="/" className="flex items-center justify-center space-x-2">
        <Image
          src={mounted && resolvedTheme === "dark" ? Logo_dark : Logo_light}
          alt="MB Logo"
          width={50}
          height={50}
          priority
        />
        <p className="font-title px-4 text-xl leading-8 font-bold">
          E-AgleTRT <span />
          <br className="xs:hidden inline" />
          Anniversary Shop
        </p>
      </Link>
      <div className="flex items-center justify-center gap-2">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={handleCartClick}
        >
          <ShoppingCart className="h-6 w-6" />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {cartItemCount}
            </span>
          )}
          <span className="sr-only">Carrello</span>
        </Button>
      </div>
    </header>
  );
}
