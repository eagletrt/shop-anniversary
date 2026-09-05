import { create } from "zustand";

export type CartItem = {
  id: string;
  baseProductId: string;
  eventProductId: string;
  name: string;
  basePrice: number;
  eventPrice: number;
  quantity: number;
  size?: string;
};

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;
  drawerView: "closed" | "product" | "cart" | "checkout";
  isEventPickup: boolean;
  setIsEventPickup: (val: boolean) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
  setDrawerOpen: (isOpen: boolean) => void;
  setDrawerView: (view: "closed" | "product" | "cart" | "checkout") => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isDrawerOpen: false,
  drawerView: "closed",
  isEventPickup: false,
  setIsEventPickup: (val) => set({ isEventPickup: val }),
  setDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),
  setDrawerView: (view) => set({ drawerView: view }),
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find(
        (i) => i.baseProductId === item.baseProductId && i.size === item.size
      );
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === existingItem.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })),
  clearCart: () => set({ items: [] }),
  totalPrice: () => {
    const state = get();
    return state.items.reduce((total, item) => {
      const price = state.isEventPickup ? item.eventPrice : item.basePrice;
      return total + price * item.quantity;
    }, 0);
  },
}));
