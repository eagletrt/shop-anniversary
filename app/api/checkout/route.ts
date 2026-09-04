import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, items, totalAmount } = body;

    if (!customerName || !customerEmail || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        totalAmount,
        status: "PENDING",
        orderItems: {
          create: items.map(
            (item: {
              productId: string;
              size?: string;
              quantity: number;
              priceAtTime: number;
            }) => ({
              productId: item.productId,
              size: item.size,
              quantity: item.quantity,
              priceAtTime: item.priceAtTime,
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
