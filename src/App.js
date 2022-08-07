import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/Utils/Layout";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";
import Faculties from "./pages/Faculties/Faculties";
import Faculty from "./pages/Faculty/Faculty";
import UserProfile from "./pages/UserProfile/UserProfile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import RequireAuth from "./components/Utils/RequireAuth";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="faculties" element={<Faculties />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="admin" element={<Admin />} />
          <Route path="user" element={<UserProfile />} />
          <Route path="faculties/:id" element={<Faculty />} />
        </Route>

        {/* Error Paths */}
        <Route
          path="*"
          element={
            <h1
              style={{
                maxWidth: "1920px",
                margin: "0 auto",
                padding: "150px 20px 20px 20px",
              }}
            >
              404 page not found!
            </h1>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
