import React from "react";
import { Routes, Route } from "react-router-dom";
import "./app.css";
import { Loader } from "../loader/loader";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Loader />} />
      </Routes>
    </div>
  );
}

export default App;
