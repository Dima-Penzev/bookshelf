import { Link, NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "../../redux/operations";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { useUser } from "../../contexts/CurrentUserContext";
import logoBook from "../../images/logo-book.png";
import "./header.css";

export function Header() {
  const { pathname } = useLocation();
  const loggedIn = useAppSelector((state) => state.currentUser.loggedIn);
  const currentUser = useUser();
  const dispatch = useAppDispatch();

  function handleSignOut() {
    dispatch(logoutUser(null));
    toast.warn("Вы вышли из вашего аккаунта");
  }

  return (
    <header className="header">
      <Link className="header__logo" to="/">
        <img src={logoBook} alt="логотип" height={40} />
      </Link>
      {loggedIn && <p>{currentUser.email}</p>}
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
