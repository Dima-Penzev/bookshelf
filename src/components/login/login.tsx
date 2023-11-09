import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IFormUserValues } from "../../types/types";
import { useLocalStorage } from "../../hooks/use-local-storage";
import logo from "../../images/logo-book.png";
import "../register/register.css";
import { checkUserByData } from "../../utils/check-user-by-data";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormUserValues>({ mode: "onChange" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { load } = useLocalStorage();
  const navigate = useNavigate();

  const handleFormSubmit = ({ email, password }: IFormUserValues) => {
    setErrorMessage(null);
    let usersArr;

    try {
      usersArr = load("users") ?? [];
    } catch (error) {
      setErrorMessage("Ошибка при чтении данных");
    }

    if (usersArr.length === 0) {
      setErrorMessage("Неправильные почта или пароль");
      return;
    }

    const existedUser = checkUserByData(usersArr, email, password);

    if (existedUser) {
      navigate("/", { replace: true });
    } else {
      setErrorMessage("Неправильные почта или пароль");
    }
  };

  return (
    <div className="entry">
      <img className="entry__logo" src={logo} alt="логотип" />
      <h2 className="entry__title">Рады видеть!</h2>
      <form
        className="entry__form"
        name="profile-data"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div>
          <label className="entry__label">
            E-mail
            <input
              className="entry__input"
              placeholder="E-mail"
              type="email"
              {...register("email", {
                required: "Заполните это поле",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  message:
                    "Email должен содержать символы: '@' и '.' Пример: 'xxx@xxx.xxx'",
                },
              })}
            />
            <span className="entry__error">{errors.email?.message}</span>
          </label>
          <label className="entry__label">
            Пароль
            <input
              className="entry__input"
              placeholder="Пароль"
              type="password"
              {...register("password", {
                required: "Заполните это поле",
                minLength: {
                  value: 8,
                  message: "Пароль должен быть не менее 8 символов",
                },
              })}
            />
            <span className="entry__error">{errors.password?.message}</span>
          </label>
        </div>
        <div>
          {errorMessage && (
            <p className="entry__server-error">{errorMessage}</p>
          )}
          <button
            type="submit"
            className={`entry__button ${!isValid && "entry__button_disabled"}`}
            disabled={!isValid}
          >
            Войти
          </button>
        </div>
      </form>
      <p className="entry__text">
        Ещё не зарегистрированы?{" "}
        <Link className="entry__link" to="/signup">
          Регистрация
        </Link>
      </p>
    </div>
  );
}
