import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFormUserValues } from "../types/types";
import { useLocalStorage } from "../hooks/use-local-storage";
const { save, load } = useLocalStorage();

export const registerUser = createAsyncThunk<
  IFormUserValues[],
  IFormUserValues,
  {
    rejectValue: string;
  }
>("user/registerUser", async (user, thunkAPI) => {
  const { email } = user;
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
      const updatedUsersArr = [user, ...usersArr];
      save("users", updatedUsersArr);
      return updatedUsersArr;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка при сохранении данных");
    }
  }
});

export const loginUser = createAsyncThunk<
  IFormUserValues,
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

  return existedUser
    ? existedUser
    : thunkAPI.rejectWithValue("Неправильные почта или пароль");
});
