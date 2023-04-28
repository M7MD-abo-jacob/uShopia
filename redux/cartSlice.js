import { setLocalStorage } from "@/lib/localStorageActions";
import rejectAction from "@/lib/rejectAction";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.value = action.payload;
      // setLocalStorage("cart", action.payload);
    },
    addToCart: (state, action) => {
      state.value = [...state.value, action.payload];
      // setLocalStorage("cart", state.value);
    },
    removeFromCart: (state, action) => {
      state.value.splice(
        state.value.findIndex((prod) => prod.id === action.payload.id),
        1
      );
      // setLocalStorage("cart", state.value);
    },
    minusOne: (state, action) => {
      const i = state.value.findIndex((prod) => prod.id === action.payload.id);
      state.value[i].count <= 1 ? rejectAction() : (state.value[i].count -= 1);
      // setLocalStorage("cart", state.value);
    },
    plusOne: (state, action) => {
      const i = state.value.findIndex((prod) => prod.id === action.payload.id);
      state.value[i].count += 1;
      // setLocalStorage("cart", state.value);
    },
    setNum: (state, action) => {
      const i = state.value.findIndex((prod) => prod.id === action.payload.id);
      action.payload.count > 0
        ? (state.value[i].count = action.payload.count)
        : rejectAction();
      // setLocalStorage("cart", state.value);
    },
    clearAll: (state) => {
      state.value = [];
      // setLocalStorage("cart", state.value);
    },
  },
});

export const {
  setCartItems,
  addToCart,
  removeFromCart,
  plusOne,
  minusOne,
  setNum,
  clearAll,
} = cartSlice.actions;

export default cartSlice.reducer;

export const cart = (state) => state.cart.value;
