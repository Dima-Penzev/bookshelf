import logo from "../../images/logo-book.png";
import { IFormValues } from "../../types/types";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./register.css";

type Props = {
  onRegister(email: string, password: string): void;
  errorMessage: string | null;
};

export default function Register({ onRegister, errorMessage }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IFormValues>({ mode: "onChange" });

  const handleFormSubmit = ({ email, password }: IFormValues) => {
    onRegister(email, password);
  };

  useEffect(() => {
    if (!errorMessage) {
      reset();
    }
  }, [errorMessage]);

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
