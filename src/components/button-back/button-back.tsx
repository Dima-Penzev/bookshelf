import "./button-back.css";
import { Link, useLocation } from "react-router-dom";

export function ButtonBack() {
  const location = useLocation();

  return (
    <Link className="button-back" to={location?.state?.from?.pathname ?? "/"}>
      &#8656; Назад
    </Link>
  );
}
