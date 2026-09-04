import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, items } = body;

    if (!customerName || !customerEmail || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        nomeCognome: customerName,
        email: customerEmail,
        shipping: "RITIRO_EVENTO", // Default since it's required
        orderItems: {
          create: items.map(
            (item: { productId: string; quantity: number }) => ({
              itemId: item.productId,
              qty: item.quantity,
            })
          ),
        },
      },
    });

    return NextResponse.json(
      { success: true, orderId: order.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
