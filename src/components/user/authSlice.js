import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout() {
      localStorage.removeItem("token");
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
