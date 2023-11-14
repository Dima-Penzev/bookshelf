import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "../register/register";
import Login from "../login/login";
import ProtectedRouteElement from "../protected-route/protected-route";
import { useAppSelector } from "../../hooks/redux-hooks";
import "./app.css";
import Main from "../main/main";

function App() {
  const navigate = useNavigate();
  const loggedIn = useAppSelector((state) => state.currentUser.loggedIn);

  useEffect(() => {
    if (loggedIn) {
      navigate("/", { replace: true });
    }
  }, [loggedIn]);

  return (
    <div className="app">
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRouteElement element={<Main />} loggedIn={loggedIn} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
