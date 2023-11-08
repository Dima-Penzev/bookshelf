import { IFormValues } from "../types/types";

export const useLocalStorage = () => {
  const save = (key: string, value: IFormValues[]) => {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  };

  const load = (key: string) => {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  };

  return { save, load };
};
