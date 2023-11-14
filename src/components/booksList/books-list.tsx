import "./books-list.css";

type Props = {
  children: JSX.Element[];
};

function BooksList({ children }: Props) {
  return <ul className="books-list">{children}</ul>;
}

export default BooksList;
