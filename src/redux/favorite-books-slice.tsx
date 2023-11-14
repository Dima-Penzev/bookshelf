import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../types/types";

interface IBookState {
  value: IBook[];
}

const initialState: IBookState = {
  value: [],
};

const favoriteBooksSlice = createSlice({
  name: "favoriteBooks",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<IBook>) => {
      state.value = [action.payload, ...state.value];
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((book) => book.id !== action.payload);
    },
  },
});

export const { addBook, removeBook } = favoriteBooksSlice.actions;

export const favoriteBooksReducer = favoriteBooksSlice.reducer;
