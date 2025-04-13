import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoginOpen: false,
  isSignupOpen: false,
  isAddItemOpen: false,
  addListName: "",
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
    openAddItemPopup: {
      prepare(listName, item) {
        return {
          payload: {
            listName,
            item,
          },
        };
      },

      reducer(state, action) {
        state.isAddItemOpen = true;
        state.addItem = action.payload.item;
        state.addListName = action.payload.listName;
      },
    },
    closeAddItemPopup(state) {
      state.isAddItemOpen = false;
      state.addItem = null;
      state.listName = "";
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
} = popupSlice.actions;
export default popupSlice.reducer;
