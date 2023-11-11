import { Link, NavLink } from "react-router-dom";
import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <NavLink
          className={({ isActive }) =>
            isActive ? "header__link_active" : "header__link"
          }
          to="/"
        >
          Главная
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "header__link_active" : "header__link"
          }
          to="/movies"
        >
          Сохраненные
        </NavLink>
        <Link className="header__link" to="/signin">
          Выйти
        </Link>
      </nav>
    </header>
  );
}
