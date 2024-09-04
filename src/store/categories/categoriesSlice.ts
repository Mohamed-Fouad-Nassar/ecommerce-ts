import { createSlice } from "@reduxjs/toolkit";

import { isString } from "@types/guards.types";
import { TCategory } from "@types/category.types";
import { TError, TLoading } from "@types/shared.types";

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

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,

  reducers: {
    cleanUpCategories: (state) => {
      state.records = [];
    },
  },

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
        if (isString(action.payload)) state.error = action.payload;
      }),
});

export { getCategories };
export const { cleanUpCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
