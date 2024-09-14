import { createSlice } from "@reduxjs/toolkit";

import getOrders from "./actions/getOrders";
import createOrder from "./actions/createOrder";

import { TOrder } from "@customTypes/orders.types";
import { isString } from "@customTypes/guards.types";
import { TError, TLoading } from "@customTypes/shared.types";

type OrderState = {
  error: TError;
  orders: TOrder[];
  loading: TLoading;
};

const initialState: OrderState = {
  orders: [],
  error: null,
  loading: "idle",
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.error = null;
      state.loading = "idle";
    },
  },

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

    builder
      .addCase(getOrders.pending, (state) => {
        state.error = null;
        state.loading = "pending";
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) state.error = action.payload;
      });
  },
});

export { createOrder, getOrders };
export const { resetOrderState } = ordersSlice.actions;
export default ordersSlice.reducer;
