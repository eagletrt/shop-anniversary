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

    // Group DB rows by (nome + tenYears) so each product shows as one card
    const groupMap = new Map<string, GroupedProduct>();

    for (const item of items) {
      const images = Array.isArray(item.images)
        ? (item.images as string[])
        : [];
      const key = `${item.nome}::${item.tenYears}`;

      if (groupMap.has(key)) {
        const group = groupMap.get(key)!;
        if (item.taglia) {
          group.variants.push({ taglia: item.taglia, itemId: item.id });
        }
      } else {
        groupMap.set(key, {
          id: item.id,
          nome: item.nome,
          description: item.description,
          tenYears: item.tenYears,
          price: item.price,
          images,
          variants: item.taglia
            ? [{ taglia: item.taglia, itemId: item.id }]
            : [],
        });
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
