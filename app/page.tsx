import prisma from "@/lib/prisma";
import { ShopClient } from "@/components/shop-client";

export const dynamic = "force-dynamic";

export default async function Page() {
  let products: any[] = [];

  try {
    products = await prisma.item.findMany({
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.error(
      "Database connection error or schema not initialized:",
      error
    );
  }

  return <ShopClient products={products} />;
}
