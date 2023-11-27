import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./book-page.css";
import { BookDetails } from "../../components/book-details/book-details";
import { Error } from "../../components/error/error";
import { Loader } from "../../components/loader/loader";
import { useGetBooksDetailsQuery } from "../../redux/books-api";
import { ButtonBack } from "../../components/button-back/button-back";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { addBook, removeBook } from "../../redux/user-login-slice";

export default function BookPage() {
  const { bookId } = useParams();
  const { data, isLoading, isError } = useGetBooksDetailsQuery(bookId);
  const favoriteBooksArr = useAppSelector(
    (state) => state.currentUser.user?.favoriteBooks
  );
  const userLoggedIn = useAppSelector((state) => state.currentUser.loggedIn);
  const dispatch = useAppDispatch();
  const isBookFavorite = favoriteBooksArr?.some(
    (bookId) => bookId === data?.id
  );

  function handleBook() {
    if (!userLoggedIn) {
      toast.info("Необходимо войти или зарегистрироваться");
      return;
    }

    if (!isBookFavorite && data) {
      dispatch(addBook(data?.id));
    } else {
      dispatch(removeBook(data?.id));
    }
  }

  return (
    <>
      {data && (
        <>
          <div className="book-page__container">
            <ButtonBack />
            <button
              type="button"
              className={
                isBookFavorite
                  ? "book-page__button book-page__button_added"
                  : "book-page__button"
              }
              onClick={handleBook}
            >
              {isBookFavorite
                ? "Удалить из избранного"
                : "Добавить в избранное"}
            </button>
          </div>
          <BookDetails book={data} />
        </>
      )}
      {isLoading && <Loader />}
      {isError && <Error text="Ошибка при загрузке данных" />}
    </>
  );
}
