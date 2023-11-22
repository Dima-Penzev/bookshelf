import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { IBook } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { addBook, removeBook } from "../../redux/user-login-slice";
import defaultPoster from "../../images/opened-book.jpg";
import "./book-item.css";

export function BookItem(book: IBook) {
  const { id, cover, title, authors } = book;
  const location = useLocation();
  const favoriteBooksArr = useAppSelector(
    (state) => state.currentUser.user?.favoriteBooks
  );
  const userLoggedIn = useAppSelector((state) => state.currentUser.loggedIn);
  const dispatch = useAppDispatch();

  const isBookFavorite = favoriteBooksArr?.some((bookId) => bookId === id);

  function addFavoriteBook() {
    if (userLoggedIn) {
      dispatch(addBook(id));
    } else {
      toast.info("Необходимо войти или зарегистрироваться");
      return;
    }
  }

  function removeFavoriteBook() {
    dispatch(removeBook(id));
  }

  return (
    <li className="book">
      <div className="book__links-container">
        <Link className="book__link" to={`/${id}`} state={{ from: location }}>
          Подробнее
        </Link>
        {isBookFavorite && location.pathname !== "/favorites" && (
          <p className="book__favorite">В избранном</p>
        )}
        {!isBookFavorite && location.pathname !== "/favorites" && (
          <button
            type="button"
            className="book__link"
            onClick={addFavoriteBook}
          >
            В избранное
          </button>
        )}
        {location.pathname === "/favorites" && (
          <button
            type="button"
            className="book__link book__link_added"
            onClick={removeFavoriteBook}
          >
            Удалить
          </button>
        )}
      </div>
      <div className="book__thumb">
        <img className="book__cover" src={cover || defaultPoster} alt={title} />
      </div>
      <h2 className="book__title">{title}</h2>
      <p className="book__author">{authors}</p>
    </li>
  );
}
