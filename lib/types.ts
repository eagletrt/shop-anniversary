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

/** A single size variant mapping taglia → DB item id */
export type SizeVariant = {
  taglia: string;
  itemId: string;
};

/**
 * Grouped product: multiple DB rows with the same nome+tenYears
 * are collapsed into one card. The `variants` array holds each
 * available size with its real DB item id (used at checkout).
 * For items without sizes (e.g. Cappellino), variants is empty
 * and `id` is the single DB row id.
 */
export type GroupedProduct = {
  id: string; // representative item id (first variant, or the only row)
  nome: string;
  description: string | null;
  tenYears: boolean;
  price: number;
  images: string[];
  variants: SizeVariant[]; // empty for items without taglia
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
