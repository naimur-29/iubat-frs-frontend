import React, { useRef, useState, useEffect } from "react";
import "./DeleteAccount.css";
import { useNavigate, useParams } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios";

const LOGIN_URL = "/login";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const targetUser = JSON.parse(
    window.localStorage.getItem("userInfo")
  )?.username;

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
      if (user === targetUser) {
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

        response?.data && (await axiosPrivate.delete(`/users/${id}`));

        // saving info to local storage
        window.localStorage.removeItem("userInfo");
        window.localStorage.setItem("loggedIn", "");

        setUser("");
        setPassword("");
        alert("Account Deleted Successfully!");
        navigate("/");
      }
      setErrMessage("User doesn't match!");
    } catch (err) {
      if (!err?.response) {
        setErrMessage("Connection lost!");
      } else if (err.response?.status === 401) {
        setErrMessage("Invalid username or password!");
      } else if (err.response?.status === 400) {
        setErrMessage("Missing username or password!");
      } else {
        setErrMessage("Request Failed!");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="login-main-container delete-acc-container">
      <h1 className="title">Confirm It's You</h1>
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
          <button className="login-btn delete-btn">Delete</button>
        </form>
      </main>
    </section>
  );
};

export default Login;
