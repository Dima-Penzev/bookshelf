import { Middleware } from "redux";
import { nanoid } from "nanoid";
import { applyLocalStorage } from "../hooks/use-local-storage";
const { save } = applyLocalStorage();

export const updateSearchHistoryMiddleware: Middleware =
  (store) => (next) => (action) => {
    const userId = store.getState().currentUser.user?.id;

    if (action.type === "searchHistory/addLink") {
      action.payload = { ...action.payload, userId, id: nanoid() };
    }

    if (
      action.type === "searchHistory/addLink" ||
      action.type === "searchHistory/removeLink" ||
      action.type === "searchHistory/cleanHistory"
    ) {
      const result = next(action);
      const updatedSearchHistory = store.getState().searchHistory.value;
      save("searchHistory", updatedSearchHistory);
      return result;
    }

    return next(action);
  };
