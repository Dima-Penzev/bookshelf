import { Link, NavLink, useLocation } from "react-router-dom";
import { logoutUser } from "../../redux/operations";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import logoBook from "../../images/logo-book.png";
import "./header.css";

export default function Header() {
  const { pathname } = useLocation();
  const loggedIn = useAppSelector((state) => state.currentUser.loggedIn);
  const userEmail = useAppSelector((state) => state.currentUser.user?.email);
  const dispatch = useAppDispatch();

  function handleSignOut() {
    dispatch(logoutUser(null));
  }

  return (
    <header className="header">
      <Link className="header__logo" to="/">
        <img src={logoBook} alt="логотип" height={40} />
      </Link>
      {loggedIn && <p>{userEmail}</p>}
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
          Избранное
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "header__link_active" : "header__link"
          }
          to="/history"
        >
          История
        </NavLink>
        {pathname !== "/signin" && !loggedIn && (
          <Link className="header__link" to="/signin">
            Войти
          </Link>
        )}
        {loggedIn && (
          <Link className="header__link" onClick={handleSignOut} to="">
            Выйти
          </Link>
        )}
        {pathname === "/signin" && !loggedIn && (
          <Link className="header__link" to="/signup">
            Регистрация
          </Link>
        )}
      </nav>
    </header>
  );
}
