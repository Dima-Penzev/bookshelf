import "./main.css";
import Header from "../header/header";
import BooksList from "../booksList/books-list";
import BookItem from "../book-item/book-item";
import { useGetBooksQuery } from "../../redux/books-api";
import { Loader } from "../loader/loader";
import { IResponseBook } from "../../types/types";

export default function Main() {
  const { data = {}, isLoading, isError } = useGetBooksQuery(null);
  const { items } = data;

  return (
    <div className="main">
      <Header />
      <main>
        <BooksList>
          {items &&
            items.length > 0 &&
            items.map(({ id, volumeInfo }: IResponseBook) => (
              <BookItem
                key={id}
                id={id}
                title={volumeInfo.title}
                cover={volumeInfo.imageLinks?.thumbnail}
                authors={volumeInfo.authors}
              />
            ))}
        </BooksList>
        {isLoading && <Loader />}
        {isError && <h2>Ошибка при загрузке данных!</h2>}
      </main>
    </div>
  );
}
