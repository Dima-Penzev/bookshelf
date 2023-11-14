import "./book-item.css";
import { Link } from "react-router-dom";
import defaultPoster from "../../images/opened-book.jpg";

type Props = {
  id: string;
  cover: string | undefined;
  title: string;
  authors: string[];
};

function BookItem({ id, cover, title, authors }: Props) {
  return (
    <li className="book">
      <div className="book__links-container">
        <Link className="book__link" to={`/book/${id}`}>
          Подробнее
        </Link>
        <button className="book__link" type="button">
          Добавить
        </button>
      </div>
      <div className="book__thumb">
        <img className="book__cover" src={cover || defaultPoster} alt={title} />
      </div>
      <h2 className="book__title">{title}</h2>
      <p className="book__author">{authors}</p>
    </li>
  );
}

export default BookItem;
