import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice";
import userReducer from "../store/userSlice";
import popupReducer from "../store/popupSlice";
import lastVisitedReducer from "../store/lastVisitedSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    popup: popupReducer,
    LastVisited: lastVisitedReducer,
  },
});

export default store;
