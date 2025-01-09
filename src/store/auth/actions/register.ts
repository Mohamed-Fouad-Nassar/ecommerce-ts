import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import handleAxiosErr from "@utils/handleAxiosErr";

type TFormDate = {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
};

const register = createAsyncThunk(
  "register",
  async (formData: TFormDate, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/register`,
        formData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(handleAxiosErr(err));
    }
  }
);

export default register;
