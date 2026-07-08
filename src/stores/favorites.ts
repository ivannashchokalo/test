import { create } from "zustand";

interface FavoriteStore {
  favorites: number[];
  toggleFavorite: (value: number) => void;
}

export const useFavoriteStore = create<FavoriteStore>()((set) => ({
  favorites: [],
  toggleFavorite: (value) => {
    set((state) => {
      if (state.favorites.includes(value)) {
        console.log(value);
        const filtered = state.favorites.filter((id) => id !== value);

        return { favorites: filtered };
      } else {
        return {
          favorites: [...state.favorites, value],
        };
      }
    });
  },
}));
