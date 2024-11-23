import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    adminExists: (state, action) => {
      state.admin = action.payload;
    },
    adminNotExists: (state) => {
      state.admin = null;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default authSlice;
export const { adminExists, adminNotExists, setData } = authSlice.actions;
