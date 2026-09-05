"use client";

import { useState } from "react";
import type { CheckoutRequest } from "@/lib/types";
import { useCartStore } from "@/lib/store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";

type DrawerState = "closed" | "product" | "cart" | "checkout";

interface ShopDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  view: DrawerState;
  setView: (view: DrawerState) => void;
  isInternal: boolean;
}

export function ShopDrawer({
  isOpen,
  onClose,
  view,
  setView,
  isInternal,
}: ShopDrawerProps) {
  const { items, removeItem, updateQuantity, clearCart, isEventPickup, setIsEventPickup } =
    useCartStore();

  // Checkout form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitting(true);

    try {
      // If internal, use the toggle. If external, they always pick up at the event.
      const isEvent = isInternal ? isEventPickup : true;

      const checkoutData: CheckoutRequest = {
        customerName: name,
        customerEmail: email,
        isEventPickup: isEvent,
        items: items.map((i) => ({
          productId: isEvent ? i.eventProductId : i.baseProductId,
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

  // Determine active total based on isInternal
  const getActiveTotal = () => {
    return items.reduce((total, item) => {
      const isEvent = isInternal ? isEventPickup : true;
      const price = isEvent ? item.eventPrice : item.basePrice;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="flex w-full flex-col border-zinc-800 bg-zinc-950 p-0 text-white sm:max-w-md">
        {view === "cart" && (
          <div className="flex h-full flex-col overflow-hidden">
            <SheetHeader className="shrink-0 border-b border-zinc-800 p-6">
              <SheetTitle className="text-2xl font-bold tracking-wider text-white uppercase">
                Il tuo Carrello
              </SheetTitle>
            </SheetHeader>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center p-6 text-zinc-500">
                <p>Il carrello è vuoto.</p>
                <Button
                  variant="link"
                  className="mt-4 text-neon"
                  onClick={onClose}
                >
                  Continua gli acquisti
                </Button>
              </div>
            ) : (
              <>
                <div className="min-h-0 flex-1 overflow-y-auto p-6">
                  <div className="flex flex-col gap-6">
                    {items.map((item) => {
                      const isEvent = isInternal ? isEventPickup : true;
                      const activePrice = isEvent ? item.eventPrice : item.basePrice;
                      
                      return (
                      <div key={item.id} className="flex gap-4">
                        <div className="flex flex-1 flex-col gap-1">
                          <h4 className="font-bold">{item.name}</h4>
                          <div className="font-mono text-sm text-zinc-400">
                            {item.size ? `Taglia: ${item.size} | ` : ""}€
                            {activePrice.toFixed(2)}
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
                    )})}
                  </div>
                </div>

                <div className="shrink-0 border-t border-zinc-800 bg-zinc-950 p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
                  {isInternal && (
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <label htmlFor="event-pickup" className="text-sm font-bold text-zinc-300">
                        Ritiro all&apos;Evento 10 Anni (Prezzo Intero)
                      </label>
                      <input
                        id="event-pickup"
                        type="checkbox"
                        checked={isEventPickup}
                        onChange={(e) => setIsEventPickup(e.target.checked)}
                        className="h-5 w-5 rounded border-zinc-700 bg-zinc-900 text-neon focus:ring-neon"
                      />
                    </div>
                  )}
                  <div className="mb-6 flex items-center justify-between font-mono text-xl">
                    <span>TOTALE</span>
                    <span className="font-bold text-neon">
                      €{getActiveTotal().toFixed(2)}
                    </span>
                  </div>
                  <Button
                    onClick={() => setView("checkout")}
                    className="h-14 w-full rounded-none bg-neon text-lg font-bold text-black uppercase hover:bg-white hover:text-black"
                  >
                    Procedi al Pre-ordine
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {view === "checkout" && (
          <div className="flex h-full flex-col overflow-hidden">
            <SheetHeader className="shrink-0 border-b border-zinc-800 p-6">
              <SheetTitle className="text-2xl font-bold text-white uppercase">
                Invia Pre-ordine
              </SheetTitle>
            </SheetHeader>
            <div className="min-h-0 flex-1 overflow-y-auto">
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
                    className="w-full rounded border border-zinc-700 bg-zinc-900 p-3 text-white transition-colors focus:border-neon focus:outline-none"
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
                    className="w-full rounded border border-zinc-700 bg-zinc-900 p-3 text-white transition-colors focus:border-neon focus:outline-none"
                  />
                </div>

                <div className="mt-4 border-t border-zinc-800 pt-4">
                  <div className="mb-2 flex items-center justify-between font-mono text-lg">
                    <span>Articoli:</span>
                    <span>{items.reduce((acc, i) => acc + i.quantity, 0)}</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-xl font-bold">
                    <span>Totale:</span>
                    <span className="text-neon">
                      €{getActiveTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex shrink-0 gap-4 border-t border-zinc-800 p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
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
                className="h-14 flex-2 rounded-none bg-neon text-lg font-bold text-black uppercase hover:bg-white hover:text-black"
              >
                {isSubmitting ? "Invio..." : "Conferma"}
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
