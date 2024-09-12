import { createSlice } from "@reduxjs/toolkit";

import { toggleLike } from "./actions/toggleLike";

import { TProduct } from "@customTypes/product.types";
import { isString } from "@customTypes/guards.types";
import { TError, TLoading } from "@customTypes/shared.types";

import { getWishlistItems } from "./actions/getWishlistItems";
import { logout } from "@store/auth/authSlice";

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
    // Toggle Like
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

    // Get Wishlist Items
    builder
      .addCase(getWishlistItems.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getWishlistItems.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = null;
        state.products = action.payload;
        state.itemsId = action.payload.map((el) => el.id);
      })
      .addCase(getWishlistItems.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) state.error = action.payload;
      });

    // get wishlist data on login

    // reset wishlist data on logout
    builder.addCase(logout, (state) => {
      state.loading = "idle";
      state.error = null;
      state.itemsId = [];
      state.products = [];
    });
  },
});

export { toggleLike };
export const { cleanUpProducts } = wishlistSlice.actions;
export default wishlistSlice.reducer;
