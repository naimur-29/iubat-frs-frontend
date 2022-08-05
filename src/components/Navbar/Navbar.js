import React, { useState } from "react";
import "./Navbar.css";
import { BiAtom } from "react-icons/bi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="main-navbar-container">
      <nav className="nav-container">
        <div className="left">
          <h1 className="title">IUBAT FRS</h1>
        </div>
        <div className="right">
          <button
            className="mobile-nav"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <BiAtom />
            Menu
          </button>
        </div>
      </nav>
      <div
        className={mobileMenu ? "overlay active" : "overlay"}
        onClick={() => setMobileMenu(false)}
      ></div>
      <div className={mobileMenu ? "mobile-menu active" : "overlay"}>
        {mobileMenu && (
          <div className="item-container">
            <Link to="/faculties" className="item">
              Faculties
            </Link>
            <Link to="/profile" className="item">
              User Profile
            </Link>
            <Link to="/login" className="item">
              Log In
            </Link>
            <Link to="/register" className="item">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
