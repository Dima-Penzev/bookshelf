import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { applyLocalStorage } from "../hooks/use-local-storage";
import { userRegisterReducer } from "./user-register-slice";
import { userLoginReducer } from "./user-login-slice";
import { booksApi } from "./books-api";
const { load } = applyLocalStorage();

const rootReducers = combineReducers({
  users: userRegisterReducer,
  currentUser: userLoginReducer,
  [booksApi.reducerPath]: booksApi.reducer,
});

const preloadedState = {
  users: {
    users: load("users") ?? [],
    isLoading: false,
    error: null,
  },
  currentUser: load("currentUser") ?? {},
};

export const store = configureStore({
  reducer: rootReducers,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
