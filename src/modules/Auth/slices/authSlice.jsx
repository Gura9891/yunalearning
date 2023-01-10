import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "apis/authAPI";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  error: null,
  isOpenModal: false,
};

export const login = createAsyncThunk(
  "authentication/auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const data = await authAPI.login(values);
      // Lưu thông tin vào localStorate
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },

    openAuthModal: (state) => {
      state.isOpenModal = true;
    },

    closeAuthModal: (state) => {
      state.isOpenModal = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      state.error = false;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });
  },
});

export const { logout, openAuthModal, closeAuthModal } = authSlice.actions;

export default authSlice.reducer;
