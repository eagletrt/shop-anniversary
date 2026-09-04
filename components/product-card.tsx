/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex aspect-[3/4] w-full cursor-pointer flex-col gap-4 sm:aspect-auto sm:h-[600px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
      onClick={() => onSelect(product)}
    >
      <div className="relative w-full flex-grow overflow-hidden rounded-lg bg-zinc-900">
        {/* We use standard img tags here as placeholders. For production, next/image is better */}
        <img
          src={
            isHovered
              ? product.imageLifestyle || product.imageNeutral
              : product.imageNeutral
          }
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0.9 }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button className="pointer-events-none bg-[#f3ff14] font-bold text-black uppercase hover:bg-white hover:text-black">
            Aggiungi
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center pb-4 text-center">
        <h3 className="text-xl font-bold tracking-wide text-white italic">
          {product.name}
        </h3>
        <p className="mt-1 font-mono text-lg font-semibold text-[#f3ff14]">
          €{product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
