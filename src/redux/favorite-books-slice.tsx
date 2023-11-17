import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../types/types";

interface IDataForRemovedBook {
  removedBook: IBook;
  currentUserId: string | undefined;
}

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
    addBook: (state, { payload }: PayloadAction<IBook>) => {
      const favoriteBook = state.value.find(
        (book): boolean => book.id === payload.id
      );

      if (!favoriteBook) {
        state.value = [payload, ...state.value];
      } else {
        const updatedFavoriteBook = {
          ...favoriteBook,
          usersId: favoriteBook.usersId?.concat(payload.usersId),
        };

        const filteredFavoriteBooksArr = state.value.filter(
          (book) => book.id !== payload.id
        );

        state.value = [updatedFavoriteBook, ...filteredFavoriteBooksArr];
      }
    },
    removeBook: (
      state: IBookState,
      { payload }: PayloadAction<IDataForRemovedBook>
    ) => {
      const favoriteBook = state.value.find(
        (book: IBook): boolean => book.id === payload.removedBook.id
      );
      const usersIdArr = favoriteBook?.usersId ?? [];
      const filteredFavoriteBooksArr = state.value.filter(
        (book: IBook): boolean => book.id !== payload.removedBook.id
      );

      if (usersIdArr.length > 1) {
        const filteredUsersIdArr = usersIdArr.filter(
          (id) => id !== payload.currentUserId
        );

        const updatedFavoriteBook = {
          ...payload.removedBook,
          usersId: filteredUsersIdArr,
        };
        state.value = [updatedFavoriteBook, ...filteredFavoriteBooksArr];
      } else {
        state.value = filteredFavoriteBooksArr;
      }
    },
  },
});

export const { addBook, removeBook } = favoriteBooksSlice.actions;

export const favoriteBooksReducer = favoriteBooksSlice.reducer;
