import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { TProduct } from "@types/product.types";

import handleAxiosErr from "@utils/handleAxiosErr";

export const getWishlistItems = createAsyncThunk(
  "wishlist/getWishlistItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, signal } = thunkAPI;

    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `${import.meta.env.VITE_BASE_API_URL}/wishlist?userId=1`,
        { signal }
      );

      if (!userWishlist.data.length) return fulfillWithValue([]);

      const itemsId = userWishlist?.data
        .map((el) => `id=${el.productId}`)
        .join("&");

      const response = await axios.get<TProduct[]>(
        `${import.meta.env.VITE_BASE_API_URL}/products?${itemsId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(handleAxiosErr(err));
    }
  }
);
