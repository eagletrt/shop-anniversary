import { NextResponse, after } from "next/server";
import prisma from "@/lib/prisma";
import type { CheckoutRequest, CheckoutResponse } from "@/lib/types";
import { sendOrderConfirmationEmail } from "@/lib/email";

// Simple email regex for server-side validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body: CheckoutRequest = await req.json();
    const { customerName, customerEmail, isEventPickup, items } = body;

    // --- Input validation ---
    if (
      !customerName ||
      typeof customerName !== "string" ||
      customerName.trim().length < 2
    ) {
      return NextResponse.json(
        { error: "Nome e cognome non valido" } satisfies CheckoutResponse,
        { status: 400 }
      );
    }

    if (
      !customerEmail ||
      typeof customerEmail !== "string" ||
      !EMAIL_REGEX.test(customerEmail)
    ) {
      return NextResponse.json(
        { error: "Email non valida" } satisfies CheckoutResponse,
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Il carrello è vuoto" } satisfies CheckoutResponse,
        { status: 400 }
      );
    }

    // Validate each item structure
    for (const item of items) {
      if (
        !item.productId ||
        typeof item.productId !== "string" ||
        !item.quantity ||
        typeof item.quantity !== "number" ||
        item.quantity < 1 ||
        !Number.isInteger(item.quantity)
      ) {
        return NextResponse.json(
          { error: "Dati articolo non validi" } satisfies CheckoutResponse,
          { status: 400 }
        );
      }
    }

    // --- Server-side price calculation from the database ---
    const productIds = [...new Set(items.map((i) => i.productId))];
    const dbProducts = await prisma.item.findMany({
      where: { id: { in: productIds } },
      select: { id: true, price: true },
    });

    // Verify all products exist in the database
    const productPriceMap = new Map(
      dbProducts.map((p: { id: unknown; price: unknown }) => [p.id, p.price])
    );

    for (const item of items) {
      if (!productPriceMap.has(item.productId)) {
        return NextResponse.json(
          {
            error: `Prodotto non trovato: ${item.productId}`,
          } satisfies CheckoutResponse,
          { status: 400 }
        );
      }
    }

    // Calculate total from DB prices (NEVER trust client-side prices)
    const totalAmount = items.reduce((total, item) => {
      const dbPrice = productPriceMap.get(item.productId)!;
      return total + Number(dbPrice) * item.quantity;
    }, 0);

    // --- Create order with server-validated data ---
    const order = await prisma.order.create({
      data: {
        nomeCognome: customerName.trim(),
        email: customerEmail.trim().toLowerCase(),
        shipping: isEventPickup ? "RITIRO_EVENTO" : "POST_EVENTO",
        orderItems: {
          create: items.map((item) => ({
            itemId: item.productId,
            qty: item.quantity,
          })),
        },
      },
      include: {
        orderItems: {
          include: {
            item: true,
          },
        },
      },
    });

    // --- Send Email Asynchronously ---
    after(async () => {
      const emailData = {
        orderId: order.id,
        customerName: order.nomeCognome,
        customerEmail: order.email,
        shipping: order.shipping,
        totalAmount,
        items: order.orderItems.map((oi) => ({
          nome: oi.item.nome,
          taglia: oi.item.taglia,
          quantity: oi.qty,
          price: oi.item.price,
        })),
      };
      await sendOrderConfirmationEmail(emailData);
    });

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        totalAmount,
      } satisfies CheckoutResponse,
      { status: 201 }
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Errore interno del server" } satisfies CheckoutResponse,
      { status: 500 }
    );
  }
}
