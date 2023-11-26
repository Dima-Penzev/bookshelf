import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useDebounce } from "../../hooks/use-debounce";
import { addLink } from "../../redux/user-login-slice";
import { booksApi } from "../../redux/books-api";
import { SuggestedBooks } from "../suggested-books/suggested-books";
import "./search-form.css";

type Props = {
  isLoading: boolean;
};

export function SearchForm({ isLoading }: Props) {
  const dispatch = useAppDispatch();
  const [formBook, setFormBook] = useState("");
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(formBook, 500);
  const [getSuggestedBooks, { data: books }] = booksApi.useLazyGetBooksQuery();
  const [showSuggests, setShowSuggests] = useState(false);

  useEffect(() => {
    if (debouncedSearchTerm !== "") {
      getSuggestedBooks(debouncedSearchTerm);
      setShowSuggests(true);
    }
  }, [debouncedSearchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setFormBook(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formBook === "") {
      toast.info("Введите название книги");
      return;
    }

    const normalizedValue = formBook.toLowerCase().trim();
    dispatch(addLink({ bookName: normalizedValue }));
    navigate(`/search/${normalizedValue}`, { replace: true });
    setShowSuggests(false);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <input
          className="search-form__input"
          type="text"
          placeholder="Книга"
          name="book"
          value={formBook}
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className={`search-form__button ${
            isLoading && "search-form__button-disabled"
          }`}
          type="submit"
        >
          Поиск
        </button>
        {showSuggests && (
          <ul className="search-form__suggested">
            <SuggestedBooks books={books} />
          </ul>
        )}
      </div>
    </form>
  );
}
