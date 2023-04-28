import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import mainSlice from "./mainSlice";

const store = configureStore({
  reducer: {
    main: mainSlice,
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
