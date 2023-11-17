import { useParams } from "react-router-dom";
import BookItem from "../../components/book-item/book-item";
import BooksList from "../../components/books-list/books-list";
import { Error } from "../../components/error/error";
import { Loader } from "../../components/loader/loader";
import SearchForm from "../../components/search-form/search-form";
import { useGetBooksQuery } from "../../redux/books-api";

export default function SearchPage() {
  const { bookName } = useParams();
  const { data, isLoading, isError } = useGetBooksQuery(bookName);

  return (
    <>
      <SearchForm />
      {data && (
        <BooksList>
          {data &&
            data.map((book) => (
              <BookItem
                key={book.id}
                id={book.id}
                title={book.title}
                cover={book.imageLink}
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
