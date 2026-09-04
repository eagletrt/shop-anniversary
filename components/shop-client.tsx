"use client";

import { useState } from "react";
import { Product } from "@prisma/client";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { ShopDrawer } from "@/components/shop-drawer";
import { useCartStore } from "@/lib/store";

export function ShopClient({ products }: { products: Product[] }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerView, setDrawerView] = useState<
    "closed" | "product" | "cart" | "checkout"
  >("closed");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const cartItemsCount = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setDrawerView("product");
    setDrawerOpen(true);
  };

  const handleCartClick = () => {
    setDrawerView("cart");
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#f3ff14] selection:text-black">
      <Header cartItemCount={cartItemsCount} onCartClick={handleCartClick} />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-16 space-y-4 text-center">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic md:text-6xl">
            Official <span className="text-[#f3ff14]">Equipment</span>
          </h1>
          <p className="mx-auto max-w-2xl font-mono text-sm text-zinc-400 md:text-base">
            Equipaggiamento ufficiale E-AGLE Trento Racing Team. Qualità
            ingegneristica e stile per veri appassionati.
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
        isOpen={drawerOpen}
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
