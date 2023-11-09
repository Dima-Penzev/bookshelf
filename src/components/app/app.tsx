import "./app.css";
import Register from "../register/register";
import Login from "../login/login";
import ProtectedRouteElement from "../protected-route/protected-route";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { IFormValues } from "../../types/types";
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { save, load } = useLocalStorage();
  const navigate = useNavigate();

  function handleRegister(email: string, password: string) {
    setErrorMessage(null);
    let usersArr;

    try {
      usersArr = load("users") ?? [];
    } catch (error) {
      setErrorMessage("Ошибка при чтении данных");
    }

    const existedUser = usersArr.find(
      (user: IFormValues) => user.email === email
    );

    if (existedUser) {
      setErrorMessage(`Пользователь с почтой - ${email} уже зарегистрирован.`);
    } else {
      try {
        save("users", [{ email, password, id: nanoid() }, ...usersArr]);
        handleLogin(email, password);
      } catch (error) {
        setErrorMessage("Ошибка при сохранении данных");
      }
    }
  }

  function handleLogin(email: string, password: string) {
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

    usersArr.forEach((user: IFormValues) => {
      if (user.email !== email || user.password !== password) {
        setErrorMessage("Неправильные почта или пароль");
      } else {
        setLoggedIn(true);
        navigate("/", { replace: true });
      }
    });
  }

  return (
    <div className="app">
      <Routes>
        <Route
          path="/signup"
          element={
            <Register onRegister={handleRegister} errorMessage={errorMessage} />
          }
        />
        <Route
          path="/signin"
          element={<Login onLogin={handleLogin} errorMessage={errorMessage} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRouteElement
              element={<h1>bookshelf</h1>}
              loggedIn={loggedIn}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
