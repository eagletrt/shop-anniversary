import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header({
  cartItemCount,
  onCartClick,
}: {
  cartItemCount: number;
  onCartClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {/* We will add the logo here later. Using a text placeholder for now */}
          <div className="text-xl font-bold tracking-tighter text-white uppercase">
            E-AGLE <span className="text-[#f3ff14]">KRAKEN</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-white hover:text-[#f3ff14]"
          onClick={onCartClick}
        >
          <ShoppingCart className="h-6 w-6" />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#f3ff14] text-xs font-bold text-black">
              {cartItemCount}
            </span>
          )}
          <span className="sr-only">Carrello</span>
        </Button>
      </div>
    </header>
  );
}
