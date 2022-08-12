import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-main-container">
      <h1 className="title">
        IUBAT Faculty Rating System
        <br />
        <span>Welcome</span>
      </h1>

      <div className="btn-container">
        <Link to="/admin" className="btn">
          {"Admin Panel"}
        </Link>
        <Link to="/faculties" className="btn">
          {"Demo Login"}
        </Link>
        <Link to="/register" className="btn">
          {"Login / Register"}
        </Link>
      </div>
    </div>
  );
};

export default Home;
