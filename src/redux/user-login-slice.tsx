import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFormUserValues } from "../types/types";
import { useLocalStorage } from "../hooks/use-local-storage";
import { loginUser, logoutUser } from "./operations";
const { save } = useLocalStorage();

interface IUsersState {
  user: IFormUserValues | null | undefined;
  error: string | null | undefined;
  isLoading: boolean;
  loggedIn: boolean;
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
  state.loggedIn = false;
};

const handleLoginFulfilled = (
  state: IUsersState,
  action: PayloadAction<IFormUserValues>
) => {
  state.user = action.payload;
  state.isLoading = false;
  state.loggedIn = true;
  state.error = null;

  try {
    save("currentUser", { ...state.user, loggedIn: state.loggedIn });
  } catch (error) {
    state.error = "Ошибка при сохранении данных.";
  }
};

const handleLogoutUserFulfilled = (state: IUsersState) => {
  state.user = null;
  state.error = null;
  state.isLoading = false;
  state.loggedIn = false;
};

const initialState: IUsersState = {
  user: null,
  error: null,
  isLoading: false,
  loggedIn: false,
};

const userLoginSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleLoginFulfilled)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, handleLogoutUserFulfilled)
      .addCase(logoutUser.rejected, handleRejected),
});

export const userLoginReducer = userLoginSlice.reducer;
