import React from "react";
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
import DeleteAccount from "./components/DeleteAccount/DeleteAccount";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import ManageUsers from "./components/ManageUsers/ManageUsers";
import AddFaculty from "./components/AddFaculty/AddFaculty";
import ManageVotes from "./components/ManageVotes/ManageVotes.js";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="faculties" element={<Faculties />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRoles={["user", "admin"]} />}>
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="admin" element={<Admin />} />
            <Route path="admin/users" element={<ManageUsers />} />
            <Route path="admin/faculties" element={<AddFaculty />} />
            <Route path="admin/votes" element={<ManageVotes />} />
          </Route>
          <Route path="user" element={<UserProfile />} />
          <Route path="faculties/:id" element={<Faculty />} />
          <Route path="user/accdel/:id" element={<DeleteAccount />} />
        </Route>

        {/* Error Paths */}
        <Route path="*" element={<Unauthorized />} />
      </Route>
    </Routes>
  );
};

export default App;
