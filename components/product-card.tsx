/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Item } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Item;
  onSelect: (product: Item) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Parse images if needed
  const images = Array.isArray(product.images) ? product.images as string[] : [];
  const imageNeutral = images[0] || "/placeholder-neutral.jpg";
  const imageLifestyle = images[1] || imageNeutral;

  return (
    <div
      className="group relative flex aspect-[3/4] w-full cursor-pointer flex-col gap-4 sm:aspect-auto sm:h-[600px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
      onClick={() => onSelect(product)}
    >
      <div className="relative w-full flex-grow overflow-hidden rounded-lg bg-zinc-900">
        <img
          src={
            isHovered
              ? imageLifestyle
              : imageNeutral
          }
          alt={product.nome}
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
          {product.nome}
        </h3>
        <p className="mt-1 font-mono text-lg font-semibold text-[#f3ff14]">
          €{product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
