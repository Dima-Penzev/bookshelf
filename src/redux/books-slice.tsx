import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../types/types";
import { getBooks } from "./operations";

interface ITransactionState {
  data: IBook[];
  isLoading: boolean;
  error: string | null | undefined;
}

const handlePending = (state: ITransactionState) => {
  state.isLoading = true;
};

const handleRejected = (
  state: ITransactionState,
  action: PayloadAction<string | undefined>
) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleBooksFulfilled = (
  state: ITransactionState,
  action: PayloadAction<IBook[]>
) => {
  state.data = action.payload;
  state.isLoading = false;
  state.error = null;
};

const initialState: ITransactionState = {
  data: [],
  isLoading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, handlePending)
      .addCase(getBooks.fulfilled, handleBooksFulfilled)
      .addCase(getBooks.rejected, handleRejected);
  },
});

export const booksReducer = booksSlice.reducer;
