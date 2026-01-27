import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // { id, title, price, thumbnail, qty }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((x) => x.id === item.id);
      if (existing) existing.qty += 1;
      else state.items.push({ ...item, qty: 1 });
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((x) => x.id !== id);
    },
    setQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find((x) => x.id === id);
      if (!item) return;
      item.qty = Math.max(1, Number(qty) || 1);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, setQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
