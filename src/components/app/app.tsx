import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "../register/register";
import Login from "../login/login";
import ProtectedRouteElement from "../protected-route/protected-route";
import { useLocalStorage } from "../../hooks/use-local-storage";
import "./app.css";

function App() {
  const navigate = useNavigate();
  const { load } = useLocalStorage();
  const currentUser = load("currentUser") ?? null;
  const { loggedIn } = currentUser;

  useEffect(() => {
    if (loggedIn) {
      navigate("/", { replace: true });
    }
  }, loggedIn);

  return (
    <div className="app">
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
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
