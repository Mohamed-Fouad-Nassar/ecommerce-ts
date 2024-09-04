import { createSlice } from "@reduxjs/toolkit";

import { isString } from "@customTypes/guards.types";
import { TProduct } from "@customTypes/product.types";
import { TError, TLoading } from "@customTypes/shared.types";

import getProductsByPrefix from "./actions/getProductsByPrefix";

type TProducts = {
  loading: TLoading;
  error: TError;
  records: TProduct[];
};

const initialState: TProducts = {
  loading: "idle",
  error: null,
  records: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    cleanUpProducts: (state) => {
      state.records = [];
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(getProductsByPrefix.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getProductsByPrefix.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.records = action.payload;
      })
      .addCase(getProductsByPrefix.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) state.error = action.payload;
      }),
});

export const { cleanUpProducts } = productsSlice.actions;
export { getProductsByPrefix };
export default productsSlice.reducer;
