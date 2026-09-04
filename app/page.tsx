import prisma from "@/lib/prisma";
import { ShopClient } from "@/components/shop-client";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Page() {
  let products: Product[] = [];

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

    // Map DB records to the public Product type, sanitizing the images field
    products = items.map((item: { images: string[] }) => ({
      ...item,
      images: Array.isArray(item.images) ? (item.images as string[]) : [],
    }));
  } catch (error) {
    console.error(
      "Database connection error or schema not initialized:",
      error
    );
  }

  return <ShopClient products={products} />;
}
