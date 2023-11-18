import { Middleware } from "redux";
import { applyLocalStorage } from "../hooks/use-local-storage";
const { save } = applyLocalStorage();

export const updateLsMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const favoriteBooksArr = store.getState().favoriteBooks.value;

  if (
    action.type === "favoriteBooks/addBook" ||
    action.type === "favoriteBooks/removeBook"
  ) {
    save("favoriteBooks", favoriteBooksArr);
  }

  return result;
};
