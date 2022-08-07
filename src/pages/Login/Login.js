import React, { useRef, useState, useEffect } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "../../api/axios";

const LOGIN_URL = "/login";

const Login = () => {
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

      setUser("");
      setPassword("");
      navigate(from, { replace: true });
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

  return (
    <section className="login-main-container">
      <p
        ref={errRef}
        className={errMessage ? "err-message" : "offscreen"}
        aria-live="assertive"
      >
        {errMessage}
      </p>

      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {/* Username Section */}
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          ref={userRef}
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />

        {/* Password Section */}
        <label htmlFor="password">Username:</label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        {/* Submit Button */}
        <button>Login</button>
      </form>

      {/* Not Registered */}
      <p>
        Not registered?
        <span>
          <Link to="/register">Register</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
