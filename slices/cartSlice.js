import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: [],
  totalAmount: 0.0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartList = action.payload;
    },
    incrementTotalAmount: (state, action) => {
      state.totalAmount += action.payload;
    },
  },
});

export const { setCart, incrementTotalAmount } = cartSlice.actions;

// Selectors
export const selectCart = (state) => state.cart.cartList;
export const selectTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;
