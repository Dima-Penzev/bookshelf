import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoggedInUser } from "../types/types";
import { loginUser, logoutUser } from "./operations";

const handlePending = (state: ILoggedInUser) => {
  state.isLoading = true;
};

const handleRejected = (
  state: ILoggedInUser,
  action: PayloadAction<string | undefined>
) => {
  state.error = action.payload;
  state.isLoading = false;
  state.loggedIn = false;
};

const handleLoginFulfilled = (
  state: ILoggedInUser,
  action: PayloadAction<ILoggedInUser>
) => {
  state.user = action.payload.user;
  state.loggedIn = action.payload.loggedIn;
  state.isLoading = action.payload.isLoading;
  state.error = action.payload.error;
};

const handleLogoutUserFulfilled = (state: ILoggedInUser) => {
  state.user = null;
  state.error = null;
  state.isLoading = false;
  state.loggedIn = false;
};

const initialState: ILoggedInUser = {
  user: null,
  error: null,
  isLoading: false,
  loggedIn: false,
};

const userLoginSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    addLink: (state, { payload }: PayloadAction<{ bookName: string }>) => {
      state.user = {
        ...state.user,
        searchHistory: state.user?.searchHistory
          ? [payload, ...state.user.searchHistory]
          : [payload],
      };
    },
    removeLink: (state, { payload }: PayloadAction<string | undefined>) => {
      state.user = {
        ...state.user,
        searchHistory:
          state.user?.searchHistory &&
          state.user.searchHistory.filter((link) => link.id !== payload),
      };
    },
    cleanHistory: (state) => {
      state.user = {
        ...state.user,
        searchHistory: [],
      };
    },
    addBook: (state, { payload }: PayloadAction<{ bookId: string }>) => {
      state.user = {
        ...state.user,
        favoriteBooks: state.user?.favoriteBooks
          ? [payload, ...state.user.favoriteBooks]
          : [payload],
      };
    },
    removeBook: (state, { payload }: PayloadAction<string | undefined>) => {
      state.user = {
        ...state.user,
        favoriteBooks:
          state.user?.favoriteBooks &&
          state.user.favoriteBooks.filter((book) => book.id !== payload),
      };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleLoginFulfilled)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, handleLogoutUserFulfilled)
      .addCase(logoutUser.rejected, handleRejected),
});

export const { addLink, removeLink, cleanHistory, addBook, removeBook } =
  userLoginSlice.actions;

export const userLoginReducer = userLoginSlice.reducer;
