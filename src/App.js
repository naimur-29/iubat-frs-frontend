import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Navbar />
            <Home />
          </div>
        }
      />
      <Route path="*" element={<h1>404 page not found!</h1>} />
    </Routes>
  );
};

export default App;
