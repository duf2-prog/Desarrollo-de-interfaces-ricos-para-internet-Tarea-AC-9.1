import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { MenuItem } from "../../entities/entities";
import { push, ref } from "firebase/database";
import { db } from "../../services/firebaseConfig";
import logger from "../../services/logging";

interface CartEntry {
  item: MenuItem;
  quantity: number;
}

interface CartState {
  items: CartEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null
};

export const sendOrder = createAsyncThunk(
  "cart/sendOrder",
  async (entries: CartEntry[]) => {
    logger.info("Enviando pedido a Firebase desde thunk");

    const itemsRef = ref(db, "items");

    for (const entry of entries) {
      await push(itemsRef, entry);
    }

    logger.info("Pedido guardado correctamente en Firebase");
    return true;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartEntry>) {
      state.items.push(action.payload);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(entry => entry.item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error desconocido";
      });
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
