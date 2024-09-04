import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { TCategory } from "@customTypes/category.types";

import handleAxiosErr from "@utils/handleAxiosErr";

type TResponse = TCategory[];

const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const res = await axios.get<TResponse>(
        `${import.meta.env.VITE_BASE_API_URL}/categories`,
        { signal }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(handleAxiosErr(err));
    }
  }
);

export default getCategories;
