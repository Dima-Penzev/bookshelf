import { BookItem } from "../../components/book-item/book-item";
import { BooksList } from "../../components/books-list/books-list";
import { Error } from "../../components/error/error";
import { Loader } from "../../components/loader/loader";
import { SearchForm } from "../../components/search-form/search-form";
import { useGetBooksQuery } from "../../redux/books-api";

export default function HomePage() {
  const { data, isLoading, isError } = useGetBooksQuery(null);

  return (
    <>
      <SearchForm isLoading={isLoading} />
      {data && (
        <BooksList>
          {data &&
            data.map((book) => (
              <BookItem
                key={book.id}
                id={book.id}
                title={book.title}
                imageLink={book.imageLink}
                authors={book.authors}
              />
            ))}
        </BooksList>
      )}
      {isLoading && <Loader />}
      {isError && <Error text="Ошибка при загрузке данных" />}
    </>
  );
}
