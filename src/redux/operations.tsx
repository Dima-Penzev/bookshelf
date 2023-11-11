import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFormUserValues, IBook, IResponseBook } from "../types/types";
import { useLocalStorage } from "../hooks/use-local-storage";
const { save, load } = useLocalStorage();
const BASE_URL = "https://www.googleapis.com/books/v1/volumes?projection=lite";

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

export const getBooks = createAsyncThunk<
  IBook[],
  null,
  {
    rejectValue: string;
  }
>("books/getBooks", async (_, thunkAPI) => {
  try {
    const response = await fetch(`${BASE_URL}&maxResults=20&q=""`, {
      headers: {
        accept: "application/json",
      },
    });

    if (response.ok) {
      const books = await response.json();

      const liteBooksArr = await books.items.map((item: IResponseBook) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        description: item.volumeInfo.description,
        publishedDate: item.volumeInfo.publishedDate,
        imageLink: item.volumeInfo.imageLinks?.thumbnail,
        previewLink: item.volumeInfo.previewLink,
      }));

      return liteBooksArr;
    } else {
      return thunkAPI.rejectWithValue("Ошибка при загрузке данных");
    }
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка при загрузке данных");
  }
});
