import { IFormUserValues, ILoggedInUser } from "../types/types";

export const applyLocalStorage = () => {
  const save = (key: string, value: IFormUserValues[] | ILoggedInUser) => {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  };

  const load = (key: string) => {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  };

  return { save, load };
};
