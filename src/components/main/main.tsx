import "./main.css";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../header/header";
import { Footer } from "../footer/footer";
import Register from "../../pages/register/register";
import Login from "../../pages/login/login";
import HomePage from "../../pages/home-page/home-page";
import { useAppSelector } from "../../hooks/redux-hooks";
import SearchPage from "../../pages/search-page/search-page";
import ProtectedRouteElement from "../protected-route/protected-route";
import { FavoritesPage } from "../../pages/favorites-page/favorites-page";
import { Notification } from "../notification/notification";
import { HistoryPage } from "../../pages/history-page/history-page";
import { BookPage } from "../../pages/book-page/book-page";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Main() {
  const navigate = useNavigate();
  const { user, loggedIn } = useAppSelector((state) => state.currentUser);

  useEffect(() => {
    navigate("/", { replace: true });
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="main">
        <Header />
        <main>
          <Routes>
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/:bookId" element={<BookPage />} />
            <Route path="/search/:bookName" element={<SearchPage />} />
            <Route
              path="/favorites"
              element={
                <ProtectedRouteElement
                  element={<FavoritesPage />}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRouteElement
                  element={<HistoryPage />}
                  loggedIn={loggedIn}
                />
              }
            />
          </Routes>
          <Notification />
        </main>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
