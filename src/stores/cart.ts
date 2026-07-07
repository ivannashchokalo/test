import { create } from "zustand";
import type { Product } from "../types/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  products: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()((set) => ({
  products: [],
  addToCart: (product) => {
    set((state) => {
      const existingProduct = state.products.find(
        (cartProd) => cartProd.id === product.id,
      );

      if (!existingProduct) {
        const newProduct = {
          ...product,
          quantity: 1,
        };
        return {
          products: [...state.products, newProduct],
        };
      }

      const updatedProducts = state.products.map((prod) => {
        if (prod.id === product.id) {
          return {
            ...product,
            quantity: prod.quantity + 1,
          };
        }
        return prod;
      });

      return { products: updatedProducts };
    });
  },
  removeFromCart: (id) => {},
  increase: (id) => {},
  decrease: (id) => {},
  clearCart: () => {},
}));
