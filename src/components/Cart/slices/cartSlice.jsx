import { createSlice } from "@reduxjs/toolkit";
import toastMessage from "components/Toast/toastMessage";
import { toast } from "react-toastify";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },

    addCourses: (state, { payload }) => {
      if (state.cart && state.cart.length > 0) {
        const index = state.cart?.findIndex(
          (item) => item.maKhoaHoc === payload.maKhoaHoc
        );
        if (index === -1) {
          state.cart = [...state.cart, payload];
          localStorage.setItem("cart", JSON.stringify(state.cart));
        } else {
          toast.warning(
            toastMessage(
              "Thêm khoá học thất bại",
              "Bạn đã có khoá học này trong giỏ hàng!"
            )
          );
        }
      } else {
        state.cart = [...state.cart, payload];
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }

      document.getElementById("header").classList.remove("hide");
    },

    removeCourse: (state, { payload }) => {
      state.cart = state.cart.filter((cart) => cart.maKhoaHoc !== payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeAll: (state) => {
      if (state.cart.length > 0) {
        state.cart = [];
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    register: (state) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const {
  openCart,
  closeCart,
  addCourses,
  removeAll,
  removeCourse,
  register,
} = cartSlice.actions;
export default cartSlice.reducer;
