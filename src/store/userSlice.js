import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedList: {},
  favouriteItem: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedList(state, action) {
      state.selectedList = action.payload;
    },
    SetFavouriteItem(state, action) {
      state.favouriteItem = action.payload;
    },
  },
});

export const { setSelectedList, SetFavouriteItem } = userSlice.actions;
export default userSlice.reducer;
