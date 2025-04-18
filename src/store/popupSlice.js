import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoginOpen: false,
  isSignupOpen: false,
  isAddItemOpen: false,
  isListDeleteOpen: false,
  isStarEditOpen: false,
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
    openAddItemPopup(state, action) {
      state.isAddItemOpen = true;
      state.addItem = action.payload;
    },
    closeAddItemPopup(state) {
      state.isAddItemOpen = false;
      state.addItem = {};
    },
    openListDeletePopup(state) {
      state.isListDeleteOpen = true;
    },
    closeListDeletePopup(state) {
      state.isListDeleteOpen = false;
    },
    openStarEdit(state, action) {
      state.isStarEditOpen = true;
      state.addItem = action.payload;
    },
    closeStarEdit(state) {
      state.isStarEditOpen = false;
      state.addItem = {};
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
  openListDeletePopup,
  closeListDeletePopup,
  openStarEdit,
  closeStarEdit,
} = popupSlice.actions;
export default popupSlice.reducer;
