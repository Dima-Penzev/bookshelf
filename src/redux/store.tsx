import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useLocalStorage } from "../hooks/use-local-storage";
import { userRegisterReducer } from "./user-register-slice";
import { userLoginReducer } from "./user-login-slice";
import { booksReducer } from "./books-slice";
const { load } = useLocalStorage();

const rootReducers = combineReducers({
  users: userRegisterReducer,
  currentUser: userLoginReducer,
  books: booksReducer,
});

const preloadedState = {
  users: load("users") ?? {},
  currentUser: load("currentUser") ?? {},
};

export const store = configureStore({
  reducer: rootReducers,
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
