import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/operations";
import { useAppDispatch } from "../../hooks/redux-hooks";
import logoBook from "../../images/logo-book.png";
import "./header.css";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSignOut() {
    dispatch(logoutUser(null));
    navigate("/signin", { replace: true });
  }

  return (
    <header className="header">
      <Link className="header__logo" to="/">
        <img src={logoBook} alt="логотип" height={40} />
      </Link>
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
          to="/favorites"
        >
          Сохраненные
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "header__link_active" : "header__link"
          }
          to="/history"
        >
          История
        </NavLink>
        <Link className="header__link" onClick={handleSignOut} to="">
          Выйти
        </Link>
      </nav>
    </header>
  );
}
