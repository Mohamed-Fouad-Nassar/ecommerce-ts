import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { TProduct } from "@customTypes/product";

type TResponse = TProduct[];

const getProductsByPrefix = createAsyncThunk(
  "products/getProductsByPrefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get<TResponse>(
        `${import.meta.env.VITE_BASE_API_URL}/products?cat_prefix=${prefix}`
      );
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err))
        return rejectWithValue(err.response?.data.message || err.message);
      else return rejectWithValue("An unexpected error");
    }
  }
);
export default getProductsByPrefix;
