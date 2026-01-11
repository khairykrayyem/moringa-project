import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],          // favorites list
  lastUpdated: null,  // timestamp
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const item = action.payload;
      const exists = state.items.some((x) => x.id === item.id);
      if (!exists) state.items.push(item);
      state.lastUpdated = Date.now();
    },
    removeFavorite: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((x) => x.id !== id);
      state.lastUpdated = Date.now();
    },
    toggleFavorite: (state, action) => {
      const item = action.payload;
      const exists = state.items.some((x) => x.id === item.id);
      state.items = exists
        ? state.items.filter((x) => x.id !== item.id)
        : [...state.items, item];
      state.lastUpdated = Date.now();
    },
    clearFavorites: (state) => {
      state.items = [];
      state.lastUpdated = Date.now();
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
