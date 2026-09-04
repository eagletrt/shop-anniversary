"use client";

import { useState } from "react";
import type { GroupedProduct } from "@/lib/types";
import { ProductCard } from "@/components/product-card";
import { ShopDrawer } from "@/components/shop-drawer";
import { useCartStore } from "@/lib/store";

export function ShopClient({ products }: { products: GroupedProduct[] }) {
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const setDrawerOpen = useCartStore((state) => state.setDrawerOpen);
  const drawerView = useCartStore((state) => state.drawerView);
  const setDrawerView = useCartStore((state) => state.setDrawerView);

  const [selectedProduct, setSelectedProduct] =
    useState<GroupedProduct | null>(null);

  const handleProductSelect = (product: GroupedProduct) => {
    setSelectedProduct(product);
    setDrawerView("product");
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <main className="container mx-auto px-4 py-12">
        <div className="mb-16 space-y-4 text-center">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic md:text-6xl">
            Official <span className="text-primary">Equipment</span>
          </h1>
          <p className="mx-auto max-w-2xl font-mono text-sm text-muted-foreground md:text-base">
            Equipaggiamento ufficiale E-AGLE Trento Racing Team
            <br />
            Qualità ingegneristica e stile per veri appassionati
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={handleProductSelect}
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
        product={selectedProduct}
      />
    </div>
  );
}
