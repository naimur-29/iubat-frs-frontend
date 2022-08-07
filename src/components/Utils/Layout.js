import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../Navbar/Navbar";

const Layout = () => {
  return (
    <main className="app">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Layout;
