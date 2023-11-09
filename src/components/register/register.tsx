import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IFormUserValues } from "../../types/types";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { checkUserByEmail } from "../../utils/check-user-by-email";
import logo from "../../images/logo-book.png";
import "./register.css";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormUserValues>({ mode: "onChange" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { save, load } = useLocalStorage();
  const navigate = useNavigate();

  const handleFormSubmit = ({ email, password }: IFormUserValues) => {
    setErrorMessage(null);
    let usersArr;

    try {
      usersArr = load("users") ?? [];
    } catch (error) {
      setErrorMessage("Ошибка при чтении данных");
    }

    const existedUser = checkUserByEmail(usersArr, email);

    if (existedUser) {
      setErrorMessage(`Пользователь с почтой - ${email} уже зарегистрирован.`);
    } else {
      try {
        save("users", [{ email, password, id: nanoid() }, ...usersArr]);
        navigate("/", { replace: true });
      } catch (error) {
        setErrorMessage("Ошибка при сохранении данных");
      }
    }
  };

  return (
    <div className="entry">
      <img className="entry__logo" src={logo} alt="логотип" />
      <h2 className="entry__title">Добро пожаловать!</h2>
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
            Зарегистрироваться
          </button>
        </div>
      </form>
      <p className="entry__text">
        Уже зарегестрированы?{" "}
        <Link className="entry__link" to="/signin">
          Войти
        </Link>
      </p>
    </div>
  );
}
