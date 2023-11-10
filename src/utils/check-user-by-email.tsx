import { useLocalStorage } from "../hooks/use-local-storage";
import { IFormUserValues } from "../types/types";
const { load } = useLocalStorage();

export function checkUserByEmail(email: string): boolean | string {
  let usersArr;

  try {
    usersArr = load("users") ?? [];
  } catch (error) {
    return "Ошибка при чтении данных";
  }

  const checkedUser = usersArr.find(
    (user: IFormUserValues) => user.email === email
  );

  return checkedUser ? true : false;
}
