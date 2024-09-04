import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { TProduct } from "@customTypes/product.types";

import handleAxiosErr from "@utils/handleAxiosErr";

type TResponse = TProduct[];

const getProductsByPrefix = createAsyncThunk(
  "products/getProductsByPrefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const res = await axios.get<TResponse>(
        `${import.meta.env.VITE_BASE_API_URL}/products?cat_prefix=${prefix}`,
        { signal }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(handleAxiosErr(err));
    }
  }
);
export default getProductsByPrefix;
