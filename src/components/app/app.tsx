import React from "react";
import "./app.css";
import Main from "../main/main";

function App() {
  return (
    <div className="app">
      <Main />
      {/* <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRouteElement element={<Main />} loggedIn={loggedIn} />
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRouteElement
              element={<h2>search</h2>}
              loggedIn={loggedIn}
            />
          }
        />
      </Routes> */}
    </div>
  );
}

export default App;
