import { create } from "zustand";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
};

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;
  drawerView: "closed" | "product" | "cart" | "checkout";
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
  setDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),
  setDrawerView: (view) => set({ drawerView: view }),
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find(
        (i) => i.productId === item.productId && i.size === item.size
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
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));
