import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "@store/index";

import { TProduct } from "@customTypes/product.types";

import handleAxiosErr from "@utils/handleAxiosErr";

type TResponse = TProduct[];

const getCartProducts = createAsyncThunk(
  "cart/getCartProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState } = thunkAPI;

    const {
      cart: { items },
    } = getState() as RootState;

    if (!Object.keys(items).length) return fulfillWithValue([]);

    try {
      const itemIds = Object.keys(items)
        .map((el) => `id=${el}`)
        .join("&");
      const response = await axios.get<TResponse>(
        `${import.meta.env.VITE_BASE_API_URL}/products?${itemIds}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(handleAxiosErr(err));
    }
  }
);

export default getCartProducts;
