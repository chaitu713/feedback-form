import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Users";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
