import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFormUserValues } from "../types/types";
import { registerUser } from "./operations";

interface IUsersState {
  users: IFormUserValues[];
  error?: string | null;
  isLoading: boolean;
}

const handlePending = (state: IUsersState) => {
  state.isLoading = true;
};

const handleRejected = (
  state: IUsersState,
  action: PayloadAction<string | undefined>
) => {
  state.error = action.payload;
  state.isLoading = false;
};

const handleRegisterFulfilled = (
  state: IUsersState,
  action: PayloadAction<IFormUserValues[]>
) => {
  state.users = action.payload;
  state.error = null;
  state.isLoading = false;
};

const initialState: IUsersState = {
  users: [],
  error: null,
  isLoading: false,
};

const userRegisterSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleRegisterFulfilled)
      .addCase(registerUser.rejected, handleRejected);
  },
});

export const userRegisterReducer = userRegisterSlice.reducer;
