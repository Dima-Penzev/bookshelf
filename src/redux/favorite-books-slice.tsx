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
    addBooksArray: (state, action: PayloadAction<IBook[]>) => {
      state.value = action.payload;
    },
  },
});

export const { addBooksArray } = favoriteBooksSlice.actions;

export const favoriteBooksReducer = favoriteBooksSlice.reducer;
