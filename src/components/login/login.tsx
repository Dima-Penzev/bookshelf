import logo from "../../images/logo-book.png";
import { IFormValues } from "../../types/types";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../register/register.css";

type Props = {
  onLogin(email: string, password: string): void;
  errorMessage: string | null;
};

export default function Login({ onLogin, errorMessage }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IFormValues>({ mode: "onChange" });

  const handleFormSubmit = ({ email, password }: IFormValues) => {
    onLogin(email, password);
  };

  useEffect(() => {
    if (!errorMessage) {
      reset();
    }
  }, [errorMessage]);

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
