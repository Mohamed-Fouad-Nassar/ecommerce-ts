import { createSlice } from "@reduxjs/toolkit";

import { toggleLike } from "./actions/toggleLike";

import { TProduct } from "@customTypes/product";

import { TError, TLoading } from "@customTypes/shared";
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
        // state.error = action.payload as string;
        if (action.payload && typeof action.payload === "string")
          state.error = action.payload;
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
        // state.loading = "failed";
        // state.error = action.payload as string;
        state.loading = "failed";
        if (action.payload && typeof action.payload === "string")
          state.error = action.payload;
      });
  },
});

export { toggleLike };
export const { cleanUpProducts } = wishlistSlice.actions;
export default wishlistSlice.reducer;
