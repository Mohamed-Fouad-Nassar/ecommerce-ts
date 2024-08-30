import { createSlice } from "@reduxjs/toolkit";

import { TProduct } from "@customTypes/product";
import { TError, TLoading } from "@customTypes/shared";

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
        state.error = action.payload as string;
      }),
});

export const { cleanUpProducts } = productsSlice.actions;
export { getProductsByPrefix };
export default productsSlice.reducer;

//  {
//       "id": 1,
//       "title": "Regular Fit Jersey top",
//       "price": "249.00",
//       "cat_prefix": "men",
//       "img": "https://eg.hm.com/assets/styles/HNM/14482498/6103a8463876770c30cdba3535b7be1f333315fe/2/image-thumb__3464789__product_listing/cb91f8f128ac2125e0ec3a008a2e8d2497d15434.jpg"
//     },
