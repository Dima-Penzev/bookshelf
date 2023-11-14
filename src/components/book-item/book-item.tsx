import "./book-item.css";
import { Link, useLocation } from "react-router-dom";
import { IBook } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { addBook, removeBook } from "../../redux/favorite-books-slice";
import { applyLocalStorage } from "../../hooks/use-local-storage";
import defaultPoster from "../../images/opened-book.jpg";
const { save } = applyLocalStorage();

function BookItem(book: IBook): JSX.Element {
  const { id, cover, title, authors } = book;
  const location = useLocation();
  const favoriteBooksArr = useAppSelector((state) => state.favoriteBooks.value);
  const userLoggedIn = useAppSelector((state) => state.currentUser.loggedIn);
  const dispatch = useAppDispatch();
  const isBookFavorite = favoriteBooksArr.some(
    (book: IBook): boolean => book.id === id
  );

  function addFavoriteBook() {
    if (!isBookFavorite && userLoggedIn) {
      dispatch(addBook(book));
      save("favoriteBooks", [book, ...favoriteBooksArr]);
    } else {
      return;
    }
  }

  function removeFavoriteBook() {
    if (isBookFavorite) {
      dispatch(removeBook(id));
      const filteredBooksArr = favoriteBooksArr.filter(
        (book: IBook): boolean => book.id !== id
      );
      save("favoriteBooks", filteredBooksArr);
    } else {
      return;
    }
  }

  return (
    <li className="book">
      <div className="book__links-container">
        <Link className="book__link" to={`/${id}`}>
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

export default BookItem;
