import { createSlice } from "@reduxjs/toolkit";

import { TCategory } from "@customTypes/category";
import { TError, TLoading } from "@customTypes/shared";

import getCategories from "./actions/getCategories";

type TCategories = {
  loading: TLoading;
  error: TError;
  records: TCategory[];
};

const initialState: TCategories = {
  loading: "idle",
  error: null,
  records: [],
};

export const CategoriesSlice = createSlice({
  name: "categories",
  initialState,

  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.records = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      }),
});

export { getCategories };
export default CategoriesSlice.reducer;
