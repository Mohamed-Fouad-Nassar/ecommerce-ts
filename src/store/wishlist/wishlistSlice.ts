import { createSlice } from "@reduxjs/toolkit";

import { toggleLike } from "./actions/toggleLike";

import { TProduct } from "@customTypes/product.types";
import { isString } from "@customTypes/guards.types";
import { TError, TLoading } from "@customTypes/shared.types";

import { getWishlistItems } from "./actions/getWishlistItems";

type TList = {
  error: TError;
  loading: TLoading;
  itemsId: number[];
  products: TProduct[];
};

const initialState: TList = {
  error: null,
  loading: "idle",
  itemsId: [],
  products: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    cleanUpProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleLike.pending, (state) => {
        state.error = null;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        if (action.payload.type === "add")
          state.itemsId.push(action.payload.id);
        else
          state.itemsId = state.itemsId.filter(
            (el) => el !== action.payload.id
          );
        state.products = state.products.filter(
          (el) => el.id !== action.payload.id
        );
      })
      .addCase(toggleLike.rejected, (state, action) => {
        if (isString(action.payload)) state.error = action.payload;
      });

    builder
      .addCase(getWishlistItems.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getWishlistItems.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = null;
        state.products = action.payload;
      })
      .addCase(getWishlistItems.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) state.error = action.payload;
      });
  },
});

export { toggleLike };
export const { cleanUpProducts } = wishlistSlice.actions;
export default wishlistSlice.reducer;
