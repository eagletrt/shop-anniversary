/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { GroupedProduct } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCardProps {
  product: GroupedProduct;
  onSelect: (product: GroupedProduct) => void;
  isInternal: boolean;
  allPrimaryLoaded?: boolean;
  onPrimaryLoad?: () => void;
}

export function ProductCard({
  product,
  onSelect,
  isInternal,
  allPrimaryLoaded,
  onPrimaryLoad,
}: ProductCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Touch handlers for swipe
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(
    null
  );

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    if (e.targetTouches[0]) {
      setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      });
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.targetTouches[0]) {
      setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      });
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (touchStart) {
      setTouchEnd({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleSwipeEnd = (e: React.SyntheticEvent) => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;

    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
    const isLeftSwipe = isHorizontalSwipe && distanceX > minSwipeDistance;
    const isRightSwipe = isHorizontalSwipe && distanceX < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      // Prevent click on parent if we swiped
      e.stopPropagation();
      e.preventDefault(); // Might not be needed, but good to have
    }

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const images =
    product.images && product.images.length > 0
      ? product.images
      : ["/placeholder-neutral.jpg"];

  const isCurrentLoaded = loadedImages.has(currentIndex);

  const primaryLoadedRef = useRef(false);

  const handleImageLoaded = useCallback(
    (index: number) => {
      setLoadedImages((prev) => {
        if (prev.has(index)) return prev;
        return new Set(prev).add(index);
      });

      if (index === 0 && !primaryLoadedRef.current && onPrimaryLoad) {
        primaryLoadedRef.current = true;
        onPrimaryLoad();
      }
    },
    [onPrimaryLoad]
  );

  // Background lazy loading of subsequent images
  useEffect(() => {
    if (allPrimaryLoaded && images.length > 1) {
      images.forEach((src, index) => {
        if (index === 0) return; // Primary is already loaded/loading

        const img = new window.Image();
        img.src = src;
        img.onload = () => {
          setLoadedImages((prev) => {
            if (prev.has(index)) return prev;
            return new Set(prev).add(index);
          });
        };
      });
    }
  }, [allPrimaryLoaded, images]);

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
      className="group flex cursor-pointer flex-col gap-4 rounded-xl p-2 transition-all duration-300 select-none hover:scale-[1.02] hover:shadow-xl"
      onClick={() => onSelect(product)}
    >
      <div
        className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-muted"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleSwipeEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={handleSwipeEnd}
        onMouseLeave={handleSwipeEnd}
      >
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
          key={`${product.baseId}-${currentIndex}`}
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
          draggable={false}
          onLoad={() => handleImageLoaded(currentIndex)}
          onError={() => {
            if (
              currentIndex === 0 &&
              !primaryLoadedRef.current &&
              onPrimaryLoad
            ) {
              primaryLoadedRef.current = true;
              onPrimaryLoad();
            }
          }}
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
          €{(isInternal ? product.price : product.eventPrice).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
