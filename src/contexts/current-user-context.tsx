import { createContext, useContext } from "react";
import { IFormUserValues } from "../types/types";

export const CurrentUserContext = createContext<IFormUserValues | null>(null);

export const useUser = () => useContext(CurrentUserContext);
