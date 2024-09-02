import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { TProduct } from "@customTypes/product";

export const getWishlistItems = createAsyncThunk(
  "wishlist/getWishlistItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI;

    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `${import.meta.env.VITE_BASE_API_URL}/wishlist?userId=1`
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
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data.message || err.message);
      } else {
        return rejectWithValue("An unexpected error");
      }
    }
  }
);
