import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoginOpen: false,
  isSignupOpen: false,
  isAddItemOpen: false,
  isRibbonOpen: false,
  addItem: {},
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
    openRibbon(state, action) {
      state.isRibbonOpen = true;
      state.addItem = action.payload;
    },
    closeRibbon(state) {
      state.isRibbonOpen = false;
      state.addItem = {};
    },
    openAddItemPopup(state, action) {
      state.isAddItemOpen = true;
      state.addItem = action.payload;
    },
    closeAddItemPopup(state) {
      state.isAddItemOpen = false;
      state.addItem = null;
    },
  },
});

export const {
  openLoginPopup,
  openSignupPopup,
  closeLoginPopup,
  closeSignupPopup,
  openAddItemPopup,
  closeAddItemPopup,
  openRibbon,
  closeRibbon,
} = popupSlice.actions;
export default popupSlice.reducer;
