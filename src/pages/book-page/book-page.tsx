import "./book-page.css";
import { useParams } from "react-router-dom";
import { BookDetails } from "../../components/book-details/book-details";
import { Error } from "../../components/error/error";
import { Loader } from "../../components/loader/loader";
import { useGetBooksDetailsQuery } from "../../redux/books-api";
import { ButtonBack } from "../../components/button-back/button-back";

export function BookPage() {
  const { bookId } = useParams();
  const { data, isLoading, isError } = useGetBooksDetailsQuery(bookId);

  return (
    <>
      {data && (
        <>
          <div className="book-page__container">
            <ButtonBack />
          </div>
          <BookDetails book={data} />
        </>
      )}
      {isLoading && <Loader />}
      {isError && <Error text="Ошибка при загрузке данных" />}
    </>
  );
}
