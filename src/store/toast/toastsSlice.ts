import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

import { TToast, TToastWithoutId } from "@customTypes/toast.types";

type TToastsSlice = {
  records: TToast[];
};
const initialState: TToastsSlice = {
  records: [],
};

export const toastsSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<TToastWithoutId>) => {
      state.records.push({
        id: nanoid(),
        type: action.payload.type,
        title: action.payload.title,
        message: action.payload.message,
        onCloseToast: action.payload.onCloseToast,
        delayAppearance: action.payload.delayAppearance || false,
      });
    },
    removeToast: (state, action) => {
      state.records = state.records.filter((el) => el.id !== action.payload);
    },
    stopToastDelay: (state, action) => {
      state.records.map((el) => {
        if (el.id === action.payload) {
          return (el.delayAppearance = false);
        }
        return el;
      });
    },
  },
});

export const { addToast, stopToastDelay, removeToast } = toastsSlice.actions;
export default toastsSlice.reducer;
