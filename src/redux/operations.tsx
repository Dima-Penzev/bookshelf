import { createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { IFormUserValues, ILoggedInUser } from "../types/types";
import { applyLocalStorage } from "../hooks/use-local-storage";
const { save, load } = applyLocalStorage();

export const registerUser = createAsyncThunk<
  IFormUserValues[],
  IFormUserValues,
  {
    rejectValue: string;
  }
>("user/registerUser", async (user, thunkAPI) => {
  const userData = { ...user, id: nanoid() };
  const { email } = userData;
  let usersArr;

  try {
    usersArr = load("users") ?? [];
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка при чтении данных");
  }

  const existedUser = usersArr.find(
    (user: IFormUserValues) => user.email === email
  );

  if (existedUser) {
    return thunkAPI.rejectWithValue(
      `Пользователь с почтой - ${email} уже зарегистрирован.`
    );
  } else {
    try {
      const updatedUsersArr = [userData, ...usersArr];
      save("users", updatedUsersArr);
      return updatedUsersArr;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка при сохранении данных");
    }
  }
});

export const loginUser = createAsyncThunk<
  ILoggedInUser,
  IFormUserValues,
  {
    rejectValue: string;
  }
>("user/loginUser", async (userData, thunkAPI) => {
  const { email, password } = userData;
  let usersArr;

  try {
    usersArr = load("users") ?? [];
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка при чтении данных");
  }

  if (usersArr.length === 0) {
    return thunkAPI.rejectWithValue("Неправильные почта или пароль");
  }

  const existedUser = usersArr.find(
    (user: IFormUserValues) =>
      user.email === email && user.password === password
  );

  if (existedUser) {
    const loggedInUser = {
      user: existedUser,
      loggedIn: true,
      error: null,
      isLoading: false,
    };

    try {
      save("currentUser", loggedInUser);
      return loggedInUser;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка при сохранении данных.");
    }
  } else {
    return thunkAPI.rejectWithValue("Неправильные почта или пароль");
  }
});

export const logoutUser = createAsyncThunk<
  string,
  null,
  {
    rejectValue: string;
  }
>("user/logoutUser", async (_, thunkAPI) => {
  try {
    localStorage.removeItem("currentUser");
    return "Вы вышли из своей учетной записи";
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка при чтении данных");
  }
});
