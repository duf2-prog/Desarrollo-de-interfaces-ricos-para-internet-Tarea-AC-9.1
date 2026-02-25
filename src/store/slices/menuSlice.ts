import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MenuItem } from "../../entities/entities";

const initialState: MenuItem[] = [
  {
    id: 1,
    name: "app.chicken",
    quantity: 40,
    desc: "app.chickenDesc",
    price: 24,
    image: "cb.jpg"
  },
  {
    id: 2,
    name: "app.vegetable",
    quantity: 30,
    desc: "app.vegetableDesc",
    price: 22,
    image: "vb.jpg"
  },
  {
    id: 3,
    name: "app.chips",
    quantity: 50,
    desc: "app.chipsDesc",
    price: 20,
    image: "chips.jpg"
  },
  {
    id: 4,
    name: "app.icecream",
    quantity: 30,
    desc: "app.icecreamDesc",
    price: 15,
    image: "ic.jpg"
  }
];

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    reduceStock(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const item = state.find(i => i.id === action.payload.id);
      if (item) item.quantity -= action.payload.quantity;
    }
  }
});

export const { reduceStock } = menuSlice.actions;
export default menuSlice.reducer;
