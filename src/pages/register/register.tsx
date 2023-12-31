import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./register.css";
import { IFormUserValues } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { loginUser, registerUser } from "../../redux/operations";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormUserValues>({ mode: "onChange" });
  const errorMessage = useAppSelector((state) => state.users.error);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<IFormUserValues | null>(null);

  const handleFormSubmit = async (userData: IFormUserValues) => {
    await dispatch(registerUser(userData));
    setUser(userData);
  };

  useEffect(() => {
    if (!errorMessage && user) {
      dispatch(loginUser(user));
      navigate("/", { replace: true });
    }
  }, [errorMessage, user]);

  return (
    <div className="entry">
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
