import { createSlice } from "@reduxjs/toolkit";

import { TError, TLoading } from "@customTypes/shared.types";
import { TProduct } from "@customTypes/product.types";
import createOrder from "./actions/createOrder";
import { isString } from "@customTypes/guards.types";

type TOrder = {
  id: number;
  userId: number;
  subtotal: number;
  items: TProduct[];
};

type TOrderState = {
  error: TError;
  order: TOrder[];
  loading: TLoading;
};

const initialState: TOrderState = {
  order: [],
  error: null,
  loading: "idle",
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.error = null;
        state.loading = "pending";
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) state.error = action.payload;
      });
  },
});

export { createOrder };

export default ordersSlice.reducer;
