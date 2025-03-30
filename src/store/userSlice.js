import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedList: {},
  favouriteItem: {},
  selectedReviewID: null,
  selectedReview: "",
  selectedRating: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedList(state, action) {
      state.selectedList = action.payload;
    },
    setSelectedReview: {
      prepare(review, rating, reviewID) {
        return { payload: { review, rating, reviewID } };
      },

      reducer(state, action) {
        state.selectedReview = action.payload.review;
        state.selectedRating = action.payload.rating;
        state.selectedReviewID = action.payload.reviewID;
      },
    },
    resetSelectedReview(state) {
      state.selectedReview = "";
      state.selectedRating = null;
      state.selectedReviewID = null;
    },
  },
});

export const { setSelectedList, setSelectedReview, resetSelectedReview } =
  userSlice.actions;
export default userSlice.reducer;
