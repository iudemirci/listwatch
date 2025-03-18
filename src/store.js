import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/components/user/userSlice";
import authReducer from "../src/components/user/authSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});

export default store;
