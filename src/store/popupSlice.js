import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoginOpen: false,
  isSignupOpen: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openLoginPopup(state) {
      state.isLoginOpen = true;
    },
    closeLoginPopup(state) {
      state.isLoginOpen = false;
    },
    openSignupPopup(state) {
      state.isSignupOpen = true;
    },
    closeSignupPopup(state) {
      state.isSignupOpen = false;
    },
  },
});

export const {
  openLoginPopup,
  openSignupPopup,
  closeLoginPopup,
  closeSignupPopup,
} = popupSlice.actions;
export default popupSlice.reducer;
