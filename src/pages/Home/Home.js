import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";

import axios from "../../api/axios";

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // demo user state
  const [isDemoUser, setIsDemoUser] = useState(false);

  // front notice of home page under title
  const [notice, setNotice] = useState("Welcome to IUBAT FRS!");

  // demo user info
  const user = "DemoUser9";
  const password = "123";

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // logged in status
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("userInfo"));
    setIsAdmin(user?.role === "admin");
  }, []);

  const handleDemoLogin = async (e) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "/login",
        JSON.stringify({
          username: user,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      const accessToken = response?.data?.token;
      const role = response?.data?.role;
      const id = response?.data?.id;

      // saving info to local storage
      window.localStorage.setItem(
        "userInfo",
        JSON.stringify({
          username: user,
          token: accessToken,
          role: role,
          id: id,
        })
      );
      window.localStorage.setItem("loggedIn", "true");
      window.localStorage.setItem("demoUser", "true");

      setIsLoading(false);
      alert("Logged in as demo user!\nYou can access the demo admin panel!");
      window.location.reload();
    } catch (err) {
      setIsLoading(false);
      alert(err + "\nTry again!");
    }
  };

  useEffect(() => {
    setLoggedIn(window.localStorage.getItem("loggedIn") ? true : false);
    setNotice("Make sure you logout before you leave the site!");
  }, []);

  useEffect(() => {
    setIsDemoUser(window.localStorage.getItem("demoUser") ? true : false);
    setNotice(
      isDemoUser
        ? "You can access the demo admin panel, but it won't affect the real data!"
        : "Welcome to IUBAT FRS!"
    );
  }, [setIsDemoUser, setNotice, isDemoUser]);

  return (
    <section className="home-main-container">
      <h1 className="title">
        IUBAT Faculty Rating System
        <br />
        <span>Welcome</span>
      </h1>
      <p className="notice">{notice}</p>

      <div className="btn-container">
        <Link to="/faculties" className="btn">
          {"Browse Faculties"}
        </Link>

        {isAdmin && (
          <Link to="/admin" className="btn">
            {"Admin Panel"}
          </Link>
        )}

        {!isAdmin && !isDemoUser ? (
          <Link to="/" className="btn" onClick={() => handleDemoLogin()}>
            {"Demo Login"}
          </Link>
        ) : (
          isDemoUser && (
            <Link to="/demo&admin" className="btn">
              {"Demo Admin Panel"}
            </Link>
          )
        )}

        {loggedIn ? (
          <Link
            to="/"
            className="btn"
            onClick={() => {
              window.localStorage.removeItem("userInfo");
              window.localStorage.setItem("loggedIn", "");
              window.localStorage.setItem("demoUser", "");
              alert("Logout Successful!");
              navigate("/");
              window.location.reload();
            }}
          >
            Logout
          </Link>
        ) : (
          <Link to="/login" className="btn">
            {"Login / Register"}
          </Link>
        )}
      </div>

      {isLoading && <h3 className="loading">Logging in...</h3>}
    </section>
  );
};

export default Home;
