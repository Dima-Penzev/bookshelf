import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./search-form.css";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { addLink } from "../../redux/user-login-slice";

type Props = {
  isLoading: boolean;
};

export default function SearchForm({ isLoading }: Props) {
  const dispatch = useAppDispatch();
  const [formBook, setFormBook] = useState("");
  const navigate = useNavigate();

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
      </div>
    </form>
  );
}
