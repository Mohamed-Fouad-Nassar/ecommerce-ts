import { createSlice } from "@reduxjs/toolkit";

import getTotalCartItemsCart from "./selectors/getTotalCartItemsCartSelector";
import getAvailableItemsQty from "./selectors/getAvailableItemsQuantitySelector";

import { isString } from "@customTypes/guards.types";
import { TProduct } from "@customTypes/product.types";
import { TError, TLoading } from "@customTypes/shared.types";

import getCartProducts from "./actions/getCartProducts";

type CartState = {
  items: { [key: string]: number };
  products: TProduct[];
  loading: TLoading;
  error: TError;
};

const initialState: CartState = {
  items: {},
  products: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) state.items[id]++;
      else state.items[id] = 1;
    },

    changeQty: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      delete state.items[id];
      state.products = state.products.filter((el) => el.id !== id);
    },

    clearCart: (state) => {
      state.items = {};
      state.error = null;
      state.products = [];
      state.loading = "idle";
    },

    cleanUpCart: (state) => {
      state.products = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCartProducts.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.products = action.payload;
      })
      .addCase(getCartProducts.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) state.error = action.payload;
      });
  },
});

export { getTotalCartItemsCart, getAvailableItemsQty, getCartProducts };

export default cartSlice.reducer;
export const { addToCart, changeQty, removeFromCart, cleanUpCart, clearCart } =
  cartSlice.actions;
