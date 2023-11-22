import "./favorites-page.css";
import { BooksList } from "../../components/books-list/books-list";
import { useAppSelector } from "../../hooks/redux-hooks";
import { FavoriteItem } from "../../components/favorite-item/favorite-item";

export default function FavoritesPage() {
  const favoriteBooksArr =
    useAppSelector((state) => state.currentUser.user?.favoriteBooks) ?? [];

  return favoriteBooksArr.length > 0 ? (
    <BooksList>
      {favoriteBooksArr.map((bookId) => (
        <FavoriteItem key={bookId} bookId={bookId} />
      ))}
    </BooksList>
  ) : (
    <p className="favorites-text">У вас нет сохраненных книг</p>
  );
}
