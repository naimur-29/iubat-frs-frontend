import React, { useRef, useState, useEffect } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "../../api/axios";

const LOGIN_URL = "/login";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMessage("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
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

      setUser("");
      setPassword("");
      navigate(from === "/" ? "/faculties" : from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMessage("Connection lost!");
      } else if (err.response?.status === 401) {
        setErrMessage("Invalid username or password!");
      } else if (err.response?.status === 400) {
        setErrMessage("Missing username or password!");
      } else {
        setErrMessage("Login Failed!");
      }
      errRef.current.focus();
    }
  };

  useEffect(() => {
    setLoggedIn(window.localStorage.getItem("loggedIn") ? true : false);
  }, []);

  return (
    <>
      {loggedIn ? (
        <section className="login-main-container">
          <div className="logged-in-container">
            <h1 className="logged-in-text">Already logged in!</h1>
            <Link
              to="/"
              className="link"
              onClick={() => {
                window.localStorage.removeItem("userInfo");
                window.localStorage.setItem("loggedIn", "");
                alert("Logout Successful!");
                navigate("/");
                window.location.reload();
              }}
            >
              Logout
            </Link>
            <Link to="/faculties" className="link">
              View Faculties
            </Link>
            <Link to="/" className="link">
              Return Home
            </Link>
          </div>
        </section>
      ) : (
        <section className="login-main-container">
          <h1 className="title">Login</h1>
          <main className="login-inner-container">
            <p
              ref={errRef}
              className={errMessage ? "errMessage" : "offscreen"}
              aria-live="assertive"
            >
              {errMessage}
            </p>

            <form onSubmit={handleSubmit} className="login-form">
              {/* Username Section */}
              <section className="username">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  autoComplete="off"
                  ref={userRef}
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />
              </section>

              {/* Password Section */}
              <section className="password">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </section>

              {/* Submit Button */}
              <button className="login-btn">Login</button>
            </form>

            {/* Not Registered */}
            <p className="not-registered">
              Not registered?
              <span>
                <Link to="/register" className="link">
                  {" "}
                  Register
                </Link>
              </span>
            </p>
          </main>
        </section>
      )}
    </>
  );
};

export default Login;
