import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedList: {},
  favouriteItem: {},
  selectedReviewID: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedList(state, action) {
      state.selectedList = action.payload;
    },
    setSelectedReview(state, action) {
      state.selectedReviewID = action.payload;
    },
    resetSelectedReview(state) {
      state.selectedReviewID = null;
    },
  },
});

export const { setSelectedList, setSelectedReview, resetSelectedReview } =
  userSlice.actions;
export default userSlice.reducer;
