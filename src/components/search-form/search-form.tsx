import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./search-form.css";

export default function SearchForm() {
  const [formBook, setFormBook] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    setFormBook(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (formBook === "") {
      toast.info("Введите название книги");
      return;
    }

    const normalizedValue = formBook.toLowerCase().trim();
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
          disabled={status === "pending"}
          className={`search-form__button ${
            status === "pending" && "search-form__button-disabled"
          }`}
          type="submit"
        >
          Поиск
        </button>
      </div>
    </form>
  );
}
