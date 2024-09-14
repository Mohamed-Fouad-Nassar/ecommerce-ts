import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "@store/index";

import handleAxiosErr from "@utils/handleAxiosErr";

import { TOrder } from "@customTypes/orders.types";

type TResponse = TOrder[];

const getOrders = createAsyncThunk("orders/getOrders", async (_, thunkAPI) => {
  const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
  const { auth } = getState() as RootState;

  try {
    const response = await axios.get<TResponse>(
      `${import.meta.env.VITE_BASE_API_URL}/orders?userId=${auth.user?.id}`,
      { signal }
    );

    if (!response.data.length) return fulfillWithValue([]);

    return response.data;
  } catch (err) {
    return rejectWithValue(handleAxiosErr(err));
  }
});

export default getOrders;
