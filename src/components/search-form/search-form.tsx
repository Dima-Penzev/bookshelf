import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { useDebounce } from "../../hooks/use-debounce";
import { addLink } from "../../redux/user-login-slice";
import { booksApi } from "../../redux/books-api";
import { SuggestedBooks } from "../suggested-books/suggested-books";
import { useUnfocus } from "../../hooks/use-unfocus";
import "./search-form.css";

type Props = {
  isLoading: boolean;
  queryBook?: string;
};

export function SearchForm({ isLoading, queryBook }: Props) {
  const dispatch = useAppDispatch();
  const userLoggedIn = useAppSelector((state) => state.currentUser.loggedIn);
  const [formBook, setFormBook] = useState(queryBook ?? "");
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(formBook, 500);
  const [getSuggestedBooks, { data: books }] = booksApi.useLazyGetBooksQuery();
  const [showSuggests, setShowSuggests] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debouncedSearchTerm !== "" && formBook !== queryBook) {
      getSuggestedBooks(debouncedSearchTerm);
      setShowSuggests(true);
    } else {
      setShowSuggests(false);
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

    if (userLoggedIn) {
      dispatch(addLink({ bookName: normalizedValue }));
    }

    navigate(`/search/${normalizedValue}`, { replace: true });
    setShowSuggests(false);
  };

  const handleInputFocus = () => {
    setShowSuggests(true);
  };

  const handleInputUnfocus = () => {
    setShowSuggests(false);
  };

  useUnfocus(inputRef, handleInputUnfocus);

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
          onClick={handleInputFocus}
          ref={inputRef}
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
