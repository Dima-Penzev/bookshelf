import "./main.css";
import Header from "../header/header";
import BooksList from "../booksList/books-list";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { getBooks } from "../../redux/operations";

export default function Main() {
  const dispatch = useAppDispatch();
  dispatch(getBooks(null));

  return (
    <div className="main">
      <Header />
      <main>
        <BooksList />
      </main>
    </div>
  );
}
