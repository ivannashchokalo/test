import { create } from "zustand";
import type { Product } from "../types/products";

export interface CartItem extends Product {
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
  removeFromCart: (id) => {
    set((state) => {
      const filteredProducts = state.products.filter(
        (product) => product.id !== id,
      );

      return {
        products: filteredProducts,
      };
    });
  },
  increase: (id) => {
    set((state) => {
      const updatedProducts = state.products.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });

      return { products: updatedProducts };
    });
  },
  decrease: (id) => {
    set((state) => {
      const updatedProducts = state.products
        .map((product) => {
          if (product.id === id) {
            return {
              ...product,
              quantity: product.quantity - 1,
            };
          }
          return product;
        })
        .filter((product) => product.quantity > 0);

      return { products: updatedProducts };
    });
  },
  clearCart: () => {
    set(() => {
      return {
        products: [],
      };
    });
  },
}));
