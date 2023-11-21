import "./favorites-page.css";
import BookItem from "../../components/book-item/book-item";
import BooksList from "../../components/books-list/books-list";
import { useAppSelector } from "../../hooks/redux-hooks";

export function FavoritesPage() {
  const favoriteBooksArr = useAppSelector(
    (state) => state.currentUser.user?.favoriteBooks
  );

  return [].length > 0 ? (
    <BooksList>
      {/* {[].map((book) => (
        <BookItem
          key={book.id}
          id={book.id}
          title={book.title}
          cover={book.cover}
          authors={book.authors}
        />
      ))} */}
    </BooksList>
  ) : (
    <p className="favorites-text">У вас нет сохраненных книг</p>
  );
}
