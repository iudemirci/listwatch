import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY = "lastVisited";
const MAX_ITEMS = 10;

const getInitialState = () => {
  const local = localStorage.getItem(LOCAL_STORAGE_KEY);
  return local ? JSON.parse(local) : [];
};

const lastVisitedSlice = createSlice({
  name: "lastVisited",
  initialState: getInitialState(),
  reducers: {
    addLastVisited: (state, action) => {
      const existingIndex = state.findIndex(
        (item) =>
          item.id === action.payload.id && item.type === action.payload.type,
      );

      if (existingIndex !== -1) {
        state[existingIndex] = { ...action.payload };
      } else {
        state.unshift({ ...action.payload });
      }
      state.sort((a, b) => new Date(b.date) - new Date(a.date));

      if (state.length > MAX_ITEMS) {
        state.length = MAX_ITEMS;
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
    clearLastVisited: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return [];
    },
    getLastVisited: () => {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      return local ? JSON.parse(local) : [];
    },
  },
});

export const { clearLastVisited, getLastVisited, addLastVisited } =
  lastVisitedSlice.actions;
export default lastVisitedSlice.reducer;
