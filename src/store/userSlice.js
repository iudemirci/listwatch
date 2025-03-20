import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedList: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedList(state, action) {
      state.selectedList = action.payload;
    },
  },
});

export const { setSelectedList } = userSlice.actions;
export default userSlice.reducer;
