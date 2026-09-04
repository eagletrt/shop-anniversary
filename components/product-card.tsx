/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import type { GroupedProduct } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: GroupedProduct;
  onSelect: (product: GroupedProduct) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Images are already sanitized server-side as string[]
  const images = product.images;
  const imageNeutral = images[0] || "/placeholder-neutral.jpg";
  const imageLifestyle = images[1] || imageNeutral;

  return (
    <div
      className="group relative flex aspect-3/4 w-full cursor-pointer flex-col gap-4 sm:aspect-auto sm:h-150"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
      onClick={() => onSelect(product)}
    >
      <div className="relative w-full grow overflow-hidden rounded-lg bg-muted">
        <img
          src={isHovered ? imageLifestyle : imageNeutral}
          alt={product.nome}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0.9 }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button className="pointer-events-none bg-primary font-bold text-primary-foreground uppercase hover:bg-white hover:text-black">
            Aggiungi
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center pb-4 text-center">
        <h3 className="text-xl font-bold tracking-wide text-foreground italic">
          {product.nome}
        </h3>
        <p className="mt-1 font-mono text-lg font-semibold text-primary">
          €{product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
