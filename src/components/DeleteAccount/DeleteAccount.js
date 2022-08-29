import React, { useRef, useState, useEffect } from "react";
import "./DeleteAccount.css";
import { useNavigate, useParams } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios";

const LOGIN_URL = "/login";

const Login = () => {
  const passwordRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const targetUser = JSON.parse(
    window.localStorage.getItem("userInfo")
  )?.username;

  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMessage("");
  }, []);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          username: targetUser,
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

      setPassword("");
      alert("Account Deleted Successfully!");
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMessage("Connection lost!");
      } else if (err.response?.status === 401) {
        setErrMessage("Invalid password!");
      } else if (err.response?.status === 400) {
        setErrMessage("Missing password!");
      } else {
        setErrMessage("Request Failed!");
      }
      errRef.current.focus();
    }

    setIsLoading(false);
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
          {/* Password Section */}
          <section className="password">
            <label htmlFor="password">Password</label>
            <input
              ref={passwordRef}
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

      {isLoading && <h3 className="deleting">Deleting...</h3>}
    </section>
  );
};

export default Login;
