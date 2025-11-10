import { createSlice } from "@reduxjs/toolkit";
import type { Anime } from "./animeSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  favorites: Anime[];
}

const loadFavoritesFromStorage = (): Anime[] => {
  try {
    const stored = localStorage.getItem("anime-favorites");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load favorites from storage:", error);
    return [];
  }
};

const saveFavoritesToStorage = (favorites: Anime[]) => {
  try {
    localStorage.setItem("anime-favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to save favorites to storage:", error);
  }
};

const initialState: FavoritesState = {
  favorites: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Anime>) => {
      const exists = state.favorites.find(
        (anime) => anime.mal_id === action.payload.mal_id
      );
      if (!exists) {
        state.favorites.unshift(action.payload);
        saveFavoritesToStorage(state.favorites);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        (anime) => anime.mal_id !== action.payload
      );
      saveFavoritesToStorage(state.favorites);
    },
    clearFavorites: (state) => {
      state.favorites = [];
      saveFavoritesToStorage([]);
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
