import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "@store/index";

import { TProduct } from "@customTypes/product.types";

import handleAxiosErr from "@utils/handleAxiosErr";

export const getWishlistItems = createAsyncThunk(
  "wishlist/getWishlistItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `${import.meta.env.VITE_BASE_API_URL}/wishlist?userId=${auth.user?.id}`,
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
