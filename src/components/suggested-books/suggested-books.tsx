import { Link, useLocation } from "react-router-dom";
import "./suggested-books.css";
import defaultPoster from "../../images/opened-book.jpg";
import { IBook } from "../../types/types";

type Props = {
  books?: IBook[];
};

export function SuggestedBooks({ books = [] }: Props) {
  const location = useLocation();

  return (
    <>
      {books.slice(0, 5).map(({ id, title, imageLink }) => (
        <li key={id} className="suggested-books">
          <Link
            className="suggested-books__link"
            to={`/${id}`}
            state={{ from: location }}
          >
            <img
              className="suggested-books__img"
              src={imageLink || defaultPoster}
              alt={title}
              width={30}
            />
            <p className="suggested-books__title">{title}</p>
          </Link>
        </li>
      ))}
    </>
  );
}
