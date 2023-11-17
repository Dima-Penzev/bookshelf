import BookItem from "../../components/book-item/book-item";
import BooksList from "../../components/books-list/books-list";
import { useAppSelector } from "../../hooks/redux-hooks";

export function FavoritesPage() {
  const favoriteBooksArr = useAppSelector((state) => state.favoriteBooks.value);
  const currentUserId =
    useAppSelector((state) => state.currentUser.user?.id) ?? "";

  const favoriteBooksOfUser = favoriteBooksArr.filter(({ usersId }) =>
    usersId?.includes(currentUserId)
  );

  return favoriteBooksOfUser.length > 0 ? (
    <BooksList>
      {favoriteBooksOfUser.map((book) => (
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
