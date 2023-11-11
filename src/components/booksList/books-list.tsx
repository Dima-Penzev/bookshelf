import BookItem from "../book-item/book-item";
import { useAppSelector } from "../../hooks/redux-hooks";
import { Loader } from "../loader/loader";
// import AddMoreBtn from "../AddMoreBtn/AddMoreBtn";
// import Error from "../Error/Error";
import "./books-list.css";

function BooksList() {
  const { data, isLoading, error } = useAppSelector((state) => state.books);

  return (
    <>
      <ul className="books-list">
        {data &&
          data.length > 0 &&
          data.map(({ id, title, imageLink, authors }) => (
            <BookItem
              key={id}
              id={id}
              title={title}
              cover={imageLink}
              authors={authors}
            />
          ))}
      </ul>
      {isLoading && <Loader />}
      {error && <h2>{error}</h2>}
    </>
  );
}

export default BooksList;
