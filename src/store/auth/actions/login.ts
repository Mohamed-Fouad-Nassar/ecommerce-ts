import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import handleAxiosErr from "@utils/handleAxiosErr";

type TFormDate = {
  password: string;
  email: string;
};

type TResponse = {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  accessToken: string;
};

const login = createAsyncThunk(
  "login",
  async (formData: TFormDate, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post<TResponse>(
        `${import.meta.env.VITE_BASE_API_URL}/login`,
        formData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(handleAxiosErr(err));
    }
  }
);

export default login;
