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
        const filterd = state.favorites.filter((id) => id !== value);

        return { favorites: filterd };
      } else {
        state.favorites.push(value);

        return {
          favorites: state.favorites,
        };
      }
    });
  },
}));
