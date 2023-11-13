import "./main.css";
import Header from "../header/header";
import BooksList from "../booksList/books-list";
import BookItem from "../book-item/book-item";
import { useGetBooksQuery } from "../../redux/books-api";
import { Loader } from "../loader/loader";

export default function Main() {
  const { data = [], isLoading, isError } = useGetBooksQuery(null);

  return (
    <div className="main">
      <Header />
      <main>
        <BooksList>
          {data.map((book) => (
            <BookItem
              key={book.id}
              id={book.id}
              title={book.title}
              cover={book.imageLink}
              authors={book.authors}
            />
          ))}
        </BooksList>
        {isLoading && <Loader />}
        {isError && <h2>Ошибка при загрузке данных!</h2>}
      </main>
    </div>
  );
}
