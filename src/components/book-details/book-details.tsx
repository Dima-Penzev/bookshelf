import "./book-details.css";
import defaultImage from "../../images/opened-book.jpg";

type Props = {
  book: {
    id: string;
    title: string;
    authors: string[];
    imageLink: string | undefined;
    publishedDate: string | undefined;
    description: string | undefined;
  };
};

export function BookDetails({ book }: Props) {
  const { title, authors, imageLink, publishedDate, description } = book;
  return (
    <>
      <article className="article">
        <div className="article__cover-container">
          <img
            className="article__cover"
            src={imageLink || defaultImage}
            alt={title}
          />
        </div>
        <div className="article__text-container">
          <h2 className="article__title">{title}</h2>
          <p className="article__author">{authors}</p>
          {description && <p className="article__text">{description}</p>}
          {publishedDate && (
            <p className="article__category">
              Дата публикации: {publishedDate}
            </p>
          )}
        </div>
      </article>
    </>
  );
}
