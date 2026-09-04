/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import type { CheckoutRequest } from "@/lib/types";
import { useCartStore } from "@/lib/store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Plus, Minus } from "lucide-react";

type DrawerState = "closed" | "product" | "cart" | "checkout";

interface ShopDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  view: DrawerState;
  product?: Product | null;
  setView: (view: DrawerState) => void;
}

const DEFAULT_SIZES = ["S", "M", "L", "XL", "XXL"];

export function ShopDrawer({
  isOpen,
  onClose,
  view,
  product,
  setView,
}: ShopDrawerProps) {
  const { items, addItem, removeItem, updateQuantity, totalPrice, clearCart } =
    useCartStore();
  const [selectedSize, setSelectedSize] = useState<string>("");

  // Checkout form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasSizes = product ? !!product.taglia : false;
  const sizes = product?.taglia
    ? product.taglia.split(",").map((s) => s.trim())
    : DEFAULT_SIZES;

  // Images are already sanitized server-side as string[]
  const images = product?.images ?? [];
  const imageNeutral = images[0] || "/placeholder-neutral.jpg";

  const handleAddToCart = () => {
    if (product) {
      if (hasSizes && !selectedSize) return;

      addItem({
        id: Math.random().toString(36).substring(7),
        productId: product.id,
        name: product.nome,
        price: product.price,
        quantity: 1,
        size: hasSizes ? selectedSize : undefined,
      });
      setSelectedSize("");
      setView("cart");
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitting(true);

    try {
      const checkoutData: CheckoutRequest = {
        customerName: name,
        customerEmail: email,
        items: items.map((i) => ({
          productId: i.productId,
          size: i.size,
          quantity: i.quantity,
        })),
      };

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkoutData),
      });

      if (response.ok) {
        clearCart();
        onClose();
        alert(
          "Pre-ordine inviato con successo! Ti contatteremo presto per il pagamento e il ritiro."
        );
      }
    } catch (error) {
      console.error(error);
      alert("Errore durante l'invio del pre-ordine. Riprova.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="flex w-full flex-col border-zinc-800 bg-zinc-950 p-0 text-white sm:max-w-md">
        {view === "product" && product && (
          <>
            <SheetHeader className="border-b border-zinc-800 p-6">
              <SheetTitle className="text-2xl font-bold text-white italic">
                {product.nome}
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-900">
                <img
                  src={imageNeutral}
                  alt={product.nome}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div className="font-mono text-xl font-bold text-[#f3ff14]">
                €{product.price.toFixed(2)}
              </div>

              {hasSizes && (
                <div className="mt-4 flex flex-col gap-3">
                  <label className="text-sm font-semibold tracking-wider uppercase">
                    Seleziona Taglia
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`flex h-12 w-12 items-center justify-center border font-mono transition-colors ${
                          selectedSize === s
                            ? "border-[#f3ff14] bg-[#f3ff14] font-bold text-black"
                            : "border-zinc-700 text-white hover:border-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-zinc-800 p-6">
              <Button
                onClick={handleAddToCart}
                disabled={hasSizes && !selectedSize}
                className="h-14 w-full rounded-none bg-[#f3ff14] text-lg font-bold text-black uppercase hover:bg-white hover:text-black"
              >
                Aggiungi al Carrello
              </Button>
            </div>
          </>
        )}

        {view === "cart" && (
          <>
            <SheetHeader className="border-b border-zinc-800 p-6">
              <SheetTitle className="text-2xl font-bold tracking-wider text-white uppercase">
                Il tuo Carrello
              </SheetTitle>
            </SheetHeader>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center p-6 text-zinc-500">
                <p>Il carrello è vuoto.</p>
                <Button
                  variant="link"
                  className="mt-4 text-[#f3ff14]"
                  onClick={onClose}
                >
                  Continua gli acquisti
                </Button>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 p-6">
                  <div className="flex flex-col gap-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="flex flex-1 flex-col gap-1">
                          <h4 className="font-bold">{item.name}</h4>
                          <div className="font-mono text-sm text-zinc-400">
                            {item.size ? `Taglia: ${item.size} | ` : ""}€
                            {item.price.toFixed(2)}
                          </div>

                          <div className="mt-2 flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center rounded border border-zinc-700 hover:bg-zinc-800"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-4 text-center font-mono">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="flex h-8 w-8 items-center justify-center rounded border border-zinc-700 hover:bg-zinc-800"
                            >
                              <Plus size={14} />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-auto p-2 text-red-500 hover:text-red-400"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="border-t border-zinc-800 bg-zinc-950 p-6">
                  <div className="mb-6 flex items-center justify-between font-mono text-xl">
                    <span>TOTALE</span>
                    <span className="font-bold text-[#f3ff14]">
                      €{totalPrice().toFixed(2)}
                    </span>
                  </div>
                  <Button
                    onClick={() => setView("checkout")}
                    className="h-14 w-full rounded-none bg-[#f3ff14] text-lg font-bold text-black uppercase hover:bg-white hover:text-black"
                  >
                    Procedi al Pre-ordine
                  </Button>
                </div>
              </>
            )}
          </>
        )}

        {view === "checkout" && (
          <>
            <SheetHeader className="border-b border-zinc-800 p-6">
              <SheetTitle className="text-2xl font-bold text-white uppercase">
                Invia Pre-ordine
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="flex-1">
              <form
                id="checkout-form"
                onSubmit={handleCheckout}
                className="flex flex-col gap-6 p-6"
              >
                <div className="mb-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-red-400 uppercase">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-red-500"></span>
                    Attenzione - Raccolta Fondi
                  </h4>
                  <p className="text-sm leading-relaxed text-zinc-300">
                    Questo è un{" "}
                    <strong className="text-white">pre-ordine</strong> per una
                    raccolta fondi. Il pagamento{" "}
                    <strong className="text-white">NON</strong> avviene online.
                    Ti contatteremo per organizzare il pagamento (Contanti,
                    PayPal, o Bonifico) e la consegna.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                    Nome e Cognome *
                  </label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded border border-zinc-700 bg-zinc-900 p-3 text-white transition-colors focus:border-[#f3ff14] focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border border-zinc-700 bg-zinc-900 p-3 text-white transition-colors focus:border-[#f3ff14] focus:outline-none"
                  />
                </div>

                <div className="mt-4 border-t border-zinc-800 pt-4">
                  <div className="mb-2 flex items-center justify-between font-mono text-lg">
                    <span>Articoli:</span>
                    <span>{items.reduce((acc, i) => acc + i.quantity, 0)}</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-xl font-bold">
                    <span>Totale:</span>
                    <span className="text-[#f3ff14]">
                      €{totalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </form>
            </ScrollArea>
            <div className="flex gap-4 border-t border-zinc-800 p-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setView("cart")}
                className="h-14 flex-1 border-zinc-700 text-white hover:bg-zinc-800"
              >
                Indietro
              </Button>
              <Button
                form="checkout-form"
                type="submit"
                disabled={isSubmitting}
                className="h-14 flex-2 rounded-none bg-[#f3ff14] text-lg font-bold text-black uppercase hover:bg-white hover:text-black"
              >
                {isSubmitting ? "Invio..." : "Conferma"}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
