"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import LogoHorizontalDark from "@/public/logo_horizontal_dark.svg";
import LogoHorizontalLight from "@/public/logo_horizontal_light.svg";

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
      <Link href="/" className="flex items-center justify-center">
        <Image
          src={
            mounted && resolvedTheme === "dark"
              ? LogoHorizontalDark
              : LogoHorizontalLight
          }
          alt="E-Agle TRT Logo"
          className="h-15 w-auto sm:h-12 md:h-16"
          priority
        />
      </Link>
      <p className="font-title absolute left-1/2 -translate-x-1/2 text-lg leading-8 font-bold sm:text-xl hidden sm:block">
        Anniversary Shop
      </p>
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
