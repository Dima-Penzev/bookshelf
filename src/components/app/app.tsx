import React from "react";
import { Routes, Route } from "react-router-dom";
import "./app.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>bookshelf</h1>} />
      </Routes>
    </div>
  );
}

export default App;
