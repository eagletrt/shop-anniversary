/**
 * Shared types for client-server communication.
 * These types define the public API contract — the client should NEVER
 * import directly from @prisma/client.
 */

/** Product data exposed to the client (subset of the DB model) */
export type Product = {
  id: string;
  nome: string;
  taglia: string | null;
  description: string | null;
  tenYears: boolean;
  price: number;
  images: string[];
};

/** Item sent from the client during checkout */
export type CheckoutItem = {
  productId: string;
  size?: string;
  quantity: number;
};

/** Checkout request body */
export type CheckoutRequest = {
  customerName: string;
  customerEmail: string;
  items: CheckoutItem[];
};

/** Checkout response body */
export type CheckoutResponse =
  { success: true; orderId: string; totalAmount: number } | { error: string };
