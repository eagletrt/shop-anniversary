"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import LogoHorizontalDark from "@/public/logo_horizontal_dark.svg";

export function Navbar() {
  const cartItemCount = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );
  const setDrawerOpen = useCartStore((state) => state.setDrawerOpen);
  const setDrawerView = useCartStore((state) => state.setDrawerView);

  const handleCartClick = () => {
    setDrawerView("cart");
    setDrawerOpen(true);
  };

  return (
    <header className="sticky top-0 z-10 mb-4 flex items-center justify-between rounded-b-4xl border-b border-muted-foreground bg-card px-4 py-2 sm:px-6 md:px-8 lg:px-12 xl:px-24">
      <Link href="/" className="flex items-center justify-center">
        <Image
          src={LogoHorizontalDark}
          alt="E-Agle TRT Logo"
          className="h-15 w-auto sm:h-12 md:h-16"
          priority
        />
      </Link>
      <p className="font-title absolute left-1/2 hidden -translate-x-1/2 text-lg leading-8 font-bold sm:block sm:text-xl">
        Anniversary Shop
      </p>
      <div className="flex items-center justify-center gap-2">
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
