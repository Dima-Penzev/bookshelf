import { IFormUserValues } from "../types/types";

export const useLocalStorage = () => {
  const save = (key: string, value: IFormUserValues[] | IFormUserValues) => {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  };

  const load = (key: string) => {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  };

  return { save, load };
};
