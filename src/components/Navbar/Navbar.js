import React, { useState } from "react";
import "./Navbar.css";
import { BiAtom } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const NavItems = [
    ["Home", "/"],
    ["Faculties", "/faculties"],
    ["User Profile", "/users/:id"],
    ["Login", "/login"],
    ["Register", "/register"],
  ];

  return (
    <div className="main-navbar-container">
      <nav className="nav-container">
        <div className="left">
          <h1 className="title">
            <Link to="/">IUBAT FRS</Link>
          </h1>
        </div>
        <div className="right">
          <button
            className="mobile-nav"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <BiAtom />
            Menu
          </button>
          <div className="item-container">
            {NavItems.map((item, index) => (
              <NavLink
                to={item[1]}
                className={({ isActive }) =>
                  isActive ? "item active" : "item"
                }
                onClick={() => setMobileMenu(false)}
                key={index}
              >
                <div className="on-active-animation"></div>
                {item[0]}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      <div
        className={mobileMenu ? "overlay active" : "overlay"}
        onClick={() => setMobileMenu(false)}
      ></div>
      <div className={mobileMenu ? "mobile-menu active" : "overlay"}>
        {mobileMenu && (
          <div className="item-container">
            {NavItems.map((item, index) => (
              <Link
                to={item[1]}
                className="item"
                onClick={() => setMobileMenu(false)}
                key={index}
              >
                {item[0]}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
