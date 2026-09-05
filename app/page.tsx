import prisma from "@/lib/prisma";
import { ShopClient } from "@/components/shop-client";
import type { GroupedProduct } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Page() {
  let products: GroupedProduct[] = [];

  try {
    const items = await prisma.item.findMany({
      select: {
        id: true,
        nome: true,
        taglia: true,
        description: true,
        tenYears: true,
        price: true,
        images: true,
      },
      orderBy: { createdAt: "asc" },
    });

    // Group DB rows by nome so each product shows as one card
    const groupMap = new Map<string, GroupedProduct>();

    // First pass: create groups and handle base items (tenYears: false)
    for (const item of items) {
      if (item.tenYears) continue; // Skip tenYears: true for now
      
      const images = Array.isArray(item.images) ? (item.images as string[]) : [];
      const key = item.nome;

      if (groupMap.has(key)) {
        const group = groupMap.get(key)!;
        if (item.taglia) {
          group.variants.push({ taglia: item.taglia, baseItemId: item.id, eventItemId: "" });
        }
      } else {
        groupMap.set(key, {
          baseId: item.id,
          eventId: "", // Will be filled in second pass
          nome: item.nome,
          description: item.description,
          price: item.price,
          eventPrice: 0, // Will be filled in second pass
          images,
          variants: item.taglia ? [{ taglia: item.taglia, baseItemId: item.id, eventItemId: "" }] : [],
        });
      }
    }

    // Second pass: attach event items (tenYears: true)
    for (const item of items) {
      if (!item.tenYears) continue;
      
      const key = item.nome;
      const group = groupMap.get(key);
      if (group) {
        group.eventId = item.id;
        group.eventPrice = item.price;
        if (item.taglia) {
          const variant = group.variants.find(v => v.taglia === item.taglia);
          if (variant) {
            variant.eventItemId = item.id;
          }
        }
      }
    }

    products = Array.from(groupMap.values());
  } catch (error) {
    console.error(
      "Database connection error or schema not initialized:",
      error
    );
  }

  return <ShopClient products={products} />;
}
