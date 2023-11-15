import "./book-item.css";
import { Link, useLocation } from "react-router-dom";
import { IBook } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { addBooksArray } from "../../redux/favorite-books-slice";
import { applyLocalStorage } from "../../hooks/use-local-storage";
import defaultPoster from "../../images/opened-book.jpg";
const { save } = applyLocalStorage();

function BookItem(book: IBook): JSX.Element {
  const { id, cover, title, authors } = book;
  const location = useLocation();
  const favoriteBooksArr = useAppSelector((state) => state.favoriteBooks.value);
  const userLoggedIn = useAppSelector((state) => state.currentUser.loggedIn);
  const userId = useAppSelector((state) => state.currentUser.user?.id);
  const dispatch = useAppDispatch();

  const favoriteBook = favoriteBooksArr.find(
    (book: IBook): boolean => book.id === id
  );

  const usersIdArr = favoriteBook?.usersId ?? [];

  function addFavoriteBook(): void {
    if (userLoggedIn) {
      const updatedFavoriteBook = {
        ...book,
        usersId: [userId, ...usersIdArr],
      };

      if (!favoriteBook) {
        dispatch(addBooksArray([updatedFavoriteBook, ...favoriteBooksArr]));
        save("favoriteBooks", [updatedFavoriteBook, ...favoriteBooksArr]);
      } else {
        const filteredFavoriteBooksArr = favoriteBooksArr.filter(
          (book) => book.id !== id
        );

        dispatch(
          addBooksArray([updatedFavoriteBook, ...filteredFavoriteBooksArr])
        );
        save("favoriteBooks", [
          updatedFavoriteBook,
          ...filteredFavoriteBooksArr,
        ]);
      }
    } else {
      return;
    }
  }

  function removeFavoriteBook(): void {
    const filteredBooksArr = favoriteBooksArr.filter(
      (book: IBook): boolean => book.id !== id
    );

    if (usersIdArr.length > 1) {
      const filteredUsersIdArr = usersIdArr.filter((id) => id !== userId);
      const updatedFavoriteBook = {
        ...book,
        usersId: filteredUsersIdArr,
      };
      dispatch(addBooksArray([updatedFavoriteBook, ...filteredBooksArr]));
      save("favoriteBooks", [updatedFavoriteBook, ...filteredBooksArr]);
    } else {
      dispatch(addBooksArray(filteredBooksArr));
      save("favoriteBooks", filteredBooksArr);
    }
  }

  return (
    <li className="book">
      <div className="book__links-container">
        <Link className="book__link" to={`/${id}`}>
          Подробнее
        </Link>
        {usersIdArr.includes(userId) && location.pathname !== "/favorites" && (
          <p className="book__favorite">В избранном</p>
        )}
        {!usersIdArr.includes(userId) && location.pathname !== "/favorites" && (
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
