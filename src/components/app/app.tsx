import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../register/register";
import Login from "../login/login";
import ProtectedRouteElement from "../protected-route/protected-route";
import "./app.css";

function App() {
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
              loggedIn={true}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
