import "./favorite-item.css";
import { useGetBooksDetailsQuery } from "../../redux/books-api";
import { BookItem } from "../book-item/book-item";
import { Loader } from "../loader/loader";
import { Error } from "../error/error";

type Props = {
  bookId: string;
};

export function FavoriteItem({ bookId }: Props) {
  const { data, isError, isLoading } = useGetBooksDetailsQuery(bookId);

  return (
    <>
      {data && (
        <BookItem
          id={data.id}
          title={data.title}
          imageLink={data.imageLink}
          authors={data.authors}
        />
      )}
      {(isError || isLoading) && (
        <div className="favorite-item">
          {isLoading && <Loader />}
          {isError && <Error text="Ошибка при загрузке данных" />}
        </div>
      )}
    </>
  );
}
