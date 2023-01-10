import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "components/Cart/slices/cartSlice";
import authSlice from "modules/Auth/slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
});

export default store;
