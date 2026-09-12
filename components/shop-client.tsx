"use client";

import { useState } from "react";
import type { GroupedProduct } from "@/lib/types";
import { ProductCard } from "@/components/product-card";
import { ShopDrawer } from "@/components/shop-drawer";
import { ProductModal } from "@/components/product-modal";
import { useCartStore } from "@/lib/store";

export function ShopClient({
  products,
  isInternal,
}: {
  products: GroupedProduct[];
  isInternal: boolean;
}) {
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const setDrawerOpen = useCartStore((state) => state.setDrawerOpen);
  const drawerView = useCartStore((state) => state.drawerView);
  const setDrawerView = useCartStore((state) => state.setDrawerView);

  const [selectedProduct, setSelectedProduct] = useState<GroupedProduct | null>(
    null
  );
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Track how many primary images have loaded
  const [loadedPrimaryCount, setLoadedPrimaryCount] = useState(0);
  const allPrimaryLoaded = loadedPrimaryCount >= products.length;

  const handleProductSelect = (product: GroupedProduct) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <main className="container mx-auto px-4 py-12">
        <div className="mb-16 space-y-4 text-center">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic md:text-6xl">
            Official <span className="text-primary">Equipment</span>
          </h1>
          <p className="mx-auto max-w-2xl font-mono text-sm text-muted-foreground md:text-base">
            Equipaggiamento ufficiale E-Agle Trento Racing Team
            <br />
            Qualità ingegneristica e stile per veri appassionati
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.baseId}
              product={product}
              onSelect={handleProductSelect}
              isInternal={isInternal}
              allPrimaryLoaded={allPrimaryLoaded}
              onPrimaryLoad={() => setLoadedPrimaryCount((prev) => prev + 1)}
            />
          ))}
        </div>
      </main>

      <ShopDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setTimeout(() => setDrawerView("closed"), 300); // wait for animation
        }}
        view={drawerView}
        setView={setDrawerView}
        isInternal={isInternal}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
        isInternal={isInternal}
      />
    </div>
  );
}
