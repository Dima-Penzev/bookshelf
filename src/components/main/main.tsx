import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./main.css";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { useAppSelector } from "../../hooks/redux-hooks";
import { ProtectedRouteElement } from "../protected-route/protected-route";
import { Notification } from "../notification/notification";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Loader } from "../loader/loader";
import { ErrorBoundary } from "../error-boundary/error-boundary";

const Register = lazy(
  () =>
    import(
      "../../pages/register/register" /* webpackChunkName: "register-page" */
    )
);
const Login = lazy(
  () => import("../../pages/login/login" /* webpackChunkName: "login-page" */)
);
const HomePage = lazy(
  () =>
    import(
      "../../pages/home-page/home-page" /* webpackChunkName: "home-page" */
    )
);
const BookPage = lazy(
  () =>
    import(
      "../../pages/book-page/book-page" /* webpackChunkName: "book-page" */
    )
);
const SearchPage = lazy(
  () =>
    import(
      "../../pages/search-page/search-page" /* webpackChunkName: "search-page" */
    )
);
const FavoritesPage = lazy(
  () =>
    import(
      "../../pages/favorites-page/favorites-page" /* webpackChunkName: "favorites-page" */
    )
);
const HistoryPage = lazy(
  () =>
    import(
      "../../pages/history-page/history-page" /* webpackChunkName: "history-page" */
    )
);
const UnknownPath = lazy(
  () =>
    import(
      "../../pages/unknown-path/unknown-path" /* webpackChunkName: "unknown-path" */
    )
);

export default function Main() {
  const { user, loggedIn } = useAppSelector((state) => state.currentUser);

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="main">
        <Header />
        <main>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/signup" element={<Register />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/" element={<HomePage />} />
              <Route
                path="/:bookId"
                element={
                  <ErrorBoundary>
                    <BookPage />
                  </ErrorBoundary>
                }
              />
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
              <Route path="/*" element={<UnknownPath />} />
            </Routes>
          </Suspense>
          <Notification />
        </main>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
