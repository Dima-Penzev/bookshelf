import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { applyLocalStorage } from "../utils/apply-local-storage";
import { userRegisterReducer } from "./user-register-slice";
import { userLoginReducer } from "./user-login-slice";
import { booksApi } from "./books-api";
import { updateLocalStorageMiddleware } from "./update-local-storage-middleware";
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
  currentUser: {
    user: load("currentUser")?.user || null,
    error: null,
    isLoading: false,
    loggedIn: load("currentUser")?.loggedIn || false,
  },
};

export const store = configureStore({
  reducer: rootReducers,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(booksApi.middleware)
      .concat(updateLocalStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
