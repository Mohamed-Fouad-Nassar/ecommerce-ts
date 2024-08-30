import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { TCategory } from "@customTypes/category";

type TResponse = TCategory[];

const getCategories = createAsyncThunk("getCategories", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await axios.get<TResponse>(
      `${import.meta.env.VITE_BASE_API_URL}/categories`
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err))
      return rejectWithValue(err.response?.data.message || err.message);
    else return rejectWithValue("An unexpected error");
  }
});
export default getCategories;
