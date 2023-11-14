import BookItem from "../../components/book-item/book-item";
import BooksList from "../../components/booksList/books-list";
import { useAppSelector } from "../../hooks/redux-hooks";

export function FavoritesPage() {
  const favoriteBooksArr = useAppSelector((state) => state.favoriteBooks.value);
  return favoriteBooksArr.length > 0 ? (
    <BooksList>
      {favoriteBooksArr.map((book) => (
        <BookItem
          key={book.id}
          id={book.id}
          title={book.title}
          cover={book.cover}
          authors={book.authors}
        />
      ))}
    </BooksList>
  ) : (
    <h2>У вас нет сохраненных книг</h2>
  );
}
