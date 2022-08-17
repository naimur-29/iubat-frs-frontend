import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("userInfo"));
    setIsAdmin(user?.role === "admin");
  }, []);

  return (
    <div className="home-main-container">
      <h1 className="title">
        IUBAT Faculty Rating System
        <br />
        <span>Welcome</span>
      </h1>
      <p className="notice">Make sure you logout before you leave the site!</p>

      <div className="btn-container">
        {isAdmin && (
          <Link to="/admin" className="btn">
            {"Admin Panel"}
          </Link>
        )}
        <Link to="/faculties" className="btn">
          {"Browse Faculties"}
        </Link>
        <Link to="/register" className="btn">
          {"Login / Register"}
        </Link>
      </div>
    </div>
  );
};

export default Home;
