import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartIsOpen: false,
  user: null,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setCartIsOpen: (state, action) => {
      return { ...state, cartIsOpen: action.payload };
    },
    setUser: (state, action) => {
      return { ...state, user: action.payload };
    },
  },
});

export const { setCartIsOpen, setUser } = mainSlice.actions;

export default mainSlice.reducer;

export const mainSelector = (state) => state.main;
