import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISearchLink {
  bookName: string | undefined;
  userId?: string;
  id?: string;
}

interface ISearchHistory {
  value: ISearchLink[];
}

const initialState: ISearchHistory = {
  value: [],
};

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState,
  reducers: {
    addLink: (state, { payload }: PayloadAction<ISearchLink>) => {
      state.value = [payload, ...state.value];
    },
    removeLink: (state, { payload }: PayloadAction<string | undefined>) => {
      state.value = state.value.filter((link) => link.id !== payload);
    },
    cleanHistory: (state, { payload }: PayloadAction<string | undefined>) => {
      state.value = state.value.filter((link) => link.userId !== payload);
    },
  },
});

export const { addLink, removeLink, cleanHistory } = searchHistorySlice.actions;

export const searchHistoryReducer = searchHistorySlice.reducer;
