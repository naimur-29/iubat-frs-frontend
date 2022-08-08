import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-main-container">
      <h1 className="title">
        Welcome To <span>IUBAT Faculty Rating System</span>
      </h1>

      <div className="btn-container">
        <Link to="/admin" className="btn">
          {"Admin Panel"}
        </Link>
        <Link to="/login" className="btn">
          {"Login to Continue"}
        </Link>
      </div>
    </div>
  );
};

export default Home;
