import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice";
import userReducer from "../store/userSlice";
import popupReducer from "../store/popupSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    popup: popupReducer,
  },
});

export default store;
