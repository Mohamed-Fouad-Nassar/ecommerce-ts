import { createSlice } from "@reduxjs/toolkit";

import login from "./actions/login";
import register from "./actions/register";

import { isString } from "@customTypes/guards.types";
import { TError, TLoading } from "@customTypes/shared.types";

type AuthState = {
  loading: TLoading;
  error: TError;
  accessToken: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
};

const initialState: AuthState = {
  loading: "idle",
  error: null,
  accessToken: "",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUi: (state) => {
      state.error = null;
      state.loading = "idle";
    },

    logout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = "idle";
      state.accessToken = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) state.error = action.payload;
      });

    builder
      .addCase(login.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) state.error = action.payload;
      });
  },
});

export { register, login };
export default authSlice.reducer;
export const { resetUi, logout } = authSlice.actions;
