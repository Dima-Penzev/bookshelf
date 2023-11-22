import { Navigate } from "react-router-dom";

type Props = {
  element: JSX.Element;
  loggedIn: boolean;
};

export const ProtectedRouteElement = ({
  element: Component,
  loggedIn,
}: Props) => {
  return loggedIn ? Component : <Navigate to="/signin" replace />;
};
