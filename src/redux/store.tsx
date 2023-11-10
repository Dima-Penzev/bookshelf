import { configureStore } from "@reduxjs/toolkit";
import { userRegisterReducer } from "./userRegisterSlice";
import { userLoginReducer } from "./userLoginSlicer";

export const store = configureStore({
  reducer: {
    users: userRegisterReducer,
    currentUser: userLoginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
