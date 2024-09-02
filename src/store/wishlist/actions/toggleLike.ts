import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const toggleLike = createAsyncThunk(
  "wishlist/toggleLike",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const isRecordExist = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/wishlist?userId=1&productId=${id}`
      );

      if (isRecordExist.data.length > 0) {
        await axios.delete(
          `${import.meta.env.VITE_BASE_API_URL}/wishlist/${
            isRecordExist.data[0].id
          }`
        );
        return { type: "delete", id };
      } else {
        await axios.post(`${import.meta.env.VITE_BASE_API_URL}/wishlist`, {
          userId: 1,
          productId: id,
        });
        return { type: "add", id };
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data.message || err.message);
      } else {
        return rejectWithValue("An unexpected error");
      }
    }
  }
);
