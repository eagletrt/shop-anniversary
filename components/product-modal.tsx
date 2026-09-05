/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, Minus, Ruler } from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { GroupedProduct } from "@/lib/types";
import { cn } from "cn";

interface ProductModalProps {
  product: GroupedProduct | null;
  isOpen: boolean;
  onClose: () => void;
  isInternal: boolean;
}

export function ProductModal({
  product,
  isOpen,
  onClose,
  isInternal,
}: ProductModalProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const addItem = useCartStore((state) => state.addItem);
  const setDrawerOpen = useCartStore((state) => state.setDrawerOpen);
  const setDrawerView = useCartStore((state) => state.setDrawerView);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentImage(0);
      setSelectedSize(null);
      setQuantity(1);
      setLoadedImages(new Set());
    }
  }, [isOpen]);

  const isCurrentLoaded = loadedImages.has(currentImage);

  const handleImageLoaded = useCallback((index: number) => {
    setLoadedImages((prev) => {
      if (prev.has(index)) return prev;
      return new Set(prev).add(index);
    });
  }, []);

  const hasSizes = product?.variants && product.variants.length > 0;

  const handleAddToCart = () => {
    if (!product) return;
    if (hasSizes && !selectedSize) return;

    if (hasSizes && selectedSize) {
      const variant = product.variants.find((v) => v.taglia === selectedSize);
      if (!variant) return;

      addItem({
        id: Math.random().toString(36).substring(7),
        baseProductId: variant.baseItemId,
        eventProductId: variant.eventItemId,
        name: product.nome,
        basePrice: product.price,
        eventPrice: product.eventPrice,
        quantity,
        size: selectedSize,
      });
    } else {
      addItem({
        id: Math.random().toString(36).substring(7),
        baseProductId: product.baseId,
        eventProductId: product.eventId,
        name: product.nome,
        basePrice: product.price,
        eventPrice: product.eventPrice,
        quantity,
      });
    }

    onClose();
    setDrawerView("cart");
    setDrawerOpen(true);
  };

  const nameLower = product?.nome.toLowerCase() || "";
  const isTshirt = nameLower.includes("maglia") || nameLower.includes("t-shirt") || nameLower.includes("tshirt");
  const isHoodie = nameLower.includes("felpa") || nameLower.includes("hoodie");
  const isProPack = nameLower.includes("pro pack");
  const isVipPack = nameLower.includes("vip pack");

  const showTshirtGuide = isTshirt || isProPack || isVipPack;
  const showHoodieGuide = isHoodie || isVipPack;

  const images =
    product?.images && product.images.length > 0
      ? product.images
      : ["/placeholder-neutral.jpg"];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-[calc(100%-1rem)] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-0 sm:max-w-5xl">
        {product ? (
          <div className="flex max-h-[90vh] flex-col overflow-y-auto md:flex-row md:overflow-hidden">
            {/* Image area */}
            <div className="relative aspect-4/5 max-h-[60vh] w-full shrink-0 overflow-hidden bg-zinc-900 md:max-h-none md:w-1/2">
              {/* Skeleton */}
              <div
                className={`absolute inset-0 z-5 bg-zinc-800 transition-opacity duration-300 ${
                  isCurrentLoaded
                    ? "pointer-events-none opacity-0"
                    : "animate-pulse opacity-100"
                }`}
              />

              {/* Image — callback ref handles cached images where onLoad fires before React attaches */}
              <img
                key={`${product.baseId}-${currentImage}`}
                ref={(node) => {
                  if (node && node.complete && node.naturalWidth > 0) {
                    handleImageLoaded(currentImage);
                  }
                }}
                src={images[currentImage]}
                alt={product.nome}
                className={cn(
                  "absolute inset-0 h-full w-full object-contain transition-opacity duration-300",
                  isCurrentLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => handleImageLoaded(currentImage)}
              />

              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 left-2 z-10 h-8 w-8 rounded-full bg-black/20 text-white hover:bg-black/40"
                    onClick={() => {
                      setCurrentImage((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      );
                    }}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-2 z-10 h-8 w-8 rounded-full bg-black/20 text-white hover:bg-black/40"
                    onClick={() => {
                      setCurrentImage((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1
                      );
                    }}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                  <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                    {images.map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1.5 rounded-full transition-all",
                          i === currentImage
                            ? "w-4 bg-white"
                            : "w-1.5 bg-white/50"
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Product info */}
            <div className="w-full md:max-h-[90vh] md:w-1/2 md:overflow-y-auto">
              <div className="flex flex-col gap-6 p-6">
                <div>
                  <DialogTitle className="mb-2 text-2xl font-bold text-white italic">
                    {product.nome}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-zinc-400">
                    {product.description || "Nessuna descrizione disponibile."}
                  </DialogDescription>
                  
                  {(showTshirtGuide || showHoodieGuide) && (
                    <div className="mt-4 flex flex-wrap gap-4">
                      {showTshirtGuide && (
                        <Link href="/taglie/tshirt" className="text-sm font-medium text-neon hover:underline flex items-center gap-1.5 transition-all hover:opacity-80">
                          <Ruler className="h-4 w-4" /> Guida Taglie Maglia
                        </Link>
                      )}
                      {showHoodieGuide && (
                        <Link href="/taglie/hoodie" className="text-sm font-medium text-neon hover:underline flex items-center gap-1.5 transition-all hover:opacity-80">
                          <Ruler className="h-4 w-4" /> Guida Taglie Felpa
                        </Link>
                      )}
                    </div>
                  )}
                </div>

                <div className="font-mono text-xl font-bold text-neon">
                  €
                  {(isInternal ? product.price : product.eventPrice).toFixed(2)}
                </div>

                {hasSizes && (
                  <div className="flex flex-col gap-3">
                    <span className="text-sm font-medium text-zinc-300">
                      Seleziona Taglia
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v) => (
                        <button
                          key={v.baseItemId}
                          onClick={() => setSelectedSize(v.taglia)}
                          className={cn(
                            "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                            selectedSize === v.taglia
                              ? "border-neon bg-neon text-black"
                              : "border-zinc-700 bg-transparent text-white hover:border-zinc-500"
                          )}
                        >
                          {v.taglia}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <span className="text-sm font-medium text-zinc-300">
                    Quantità
                  </span>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 border-zinc-700 text-white hover:bg-zinc-800"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="min-w-[2ch] text-center text-lg font-medium text-white">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 border-zinc-700 text-white hover:bg-zinc-800"
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  className="mt-4 h-12 w-full bg-neon text-base font-bold text-black uppercase hover:bg-[#d6e012]"
                  disabled={hasSizes && !selectedSize}
                  onClick={handleAddToCart}
                >
                  Aggiungi al Carrello
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-white">Caricamento...</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
