import { IFormUserValues } from "../types/types";

export function checkUserByEmail(usersArr: IFormUserValues[], email: string) {
  return usersArr.find((user: IFormUserValues) => user.email === email);
}
