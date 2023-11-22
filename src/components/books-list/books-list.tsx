import "./books-list.css";

type Props = {
  children: JSX.Element[];
};

export function BooksList({ children }: Props) {
  return <ul className="books-list">{children}</ul>;
}
