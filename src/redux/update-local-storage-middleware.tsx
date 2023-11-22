import { Middleware } from "redux";
import { nanoid } from "nanoid";
import { applyLocalStorage } from "../hooks/apply-local-storage";
import { IFormUserValues } from "../types/types";
const { save } = applyLocalStorage();

export const updateLocalStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    if (action.type === "currentUser/addLink") {
      action.payload = { ...action.payload, id: nanoid() };
    }

    if (
      action.type === "currentUser/addLink" ||
      action.type === "currentUser/removeLink" ||
      action.type === "currentUser/cleanHistory" ||
      action.type === "currentUser/addBook" ||
      action.type === "currentUser/removeBook"
    ) {
      const result = next(action);

      const updatedCurrentUser = store.getState().currentUser;
      const registeredUsersArr = store.getState().users.users;

      const filteredUsersArr = registeredUsersArr.filter(
        (user: IFormUserValues) => user.id !== updatedCurrentUser.user.id
      );
      const updatedUsersArr = [updatedCurrentUser.user, ...filteredUsersArr];

      save("currentUser", updatedCurrentUser);
      save("users", updatedUsersArr);

      return result;
    }

    return next(action);
  };
