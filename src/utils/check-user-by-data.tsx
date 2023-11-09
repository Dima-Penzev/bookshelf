import { IFormUserValues } from "../types/types";

export function checkUserByData(
  usersArr: IFormUserValues[],
  email: string,
  password: string
) {
  return usersArr.find(
    (user: IFormUserValues) =>
      user.email === email && user.password === password
  );
}
