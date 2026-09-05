/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useCallback } from "react";
import type { GroupedProduct } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCardProps {
  product: GroupedProduct;
  onSelect: (product: GroupedProduct) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const images =
    product.images && product.images.length > 0
      ? product.images
      : ["/placeholder-neutral.jpg"];

  const isCurrentLoaded = loadedImages.has(currentIndex);

  const handleImageLoaded = useCallback((index: number) => {
    setLoadedImages((prev) => {
      if (prev.has(index)) return prev;
      return new Set(prev).add(index);
    });
  }, []);

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <div
      className="group flex cursor-pointer flex-col gap-4 rounded-xl p-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
      onClick={() => onSelect(product)}
    >
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-muted">
        {/* Skeleton */}
        <div
          className={`absolute inset-0 z-10 bg-zinc-800 transition-opacity duration-300 ${
            isCurrentLoaded
              ? "pointer-events-none opacity-0"
              : "animate-pulse opacity-100"
          }`}
        />

        {/* Image — callback ref handles cached images where onLoad fires before React attaches */}
        <img
          key={`${product.id}-${currentIndex}`}
          ref={(node) => {
            if (node && node.complete && node.naturalWidth > 0) {
              handleImageLoaded(currentIndex);
            }
          }}
          src={images[currentIndex]}
          alt={`${product.nome} - Image ${currentIndex + 1}`}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
            isCurrentLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => handleImageLoaded(currentIndex)}
        />

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute top-1/2 left-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-black/50"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-black/50"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute right-0 bottom-3 left-0 z-20 flex justify-center gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => handleDotClick(e, idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-4 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center px-2 pb-2 text-center">
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
