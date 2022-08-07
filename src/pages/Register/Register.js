import React, { useRef, useState, useEffect } from "react";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import "./Register.css";
import { Link } from "react-router-dom";

import axios from "../../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}/;
const REGISTER_URL = "/users";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  // Username States
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // Password States
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  // Confirm Password States
  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  // Other States
  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidMatchPassword(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMessage("");
  }, [user, password, matchPassword]);

  // Handle Submit From Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PASSWORD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMessage("Invalid Entry!");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          username: user,
          password: password,
        }),
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMessage("Connection lost!");
      } else if (err.response?.status === 409) {
        setErrMessage("Username already taken!");
      } else {
        setErrMessage("Registration failed!");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section className="register-main-container">
          <h1>Success!</h1>
          <p>
            <Link to="/login">Login</Link>
          </p>
        </section>
      ) : (
        <section className="register-main-container">
          <p
            ref={errRef}
            className={errMessage ? "errMessage" : "offscreen"}
            aria-live="assertive"
          >
            {errMessage}
          </p>

          <form onSubmit={handleSubmit}>
            {/* Username section */}
            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>
                <FaCheck />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FaTimes />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              required
              onChange={(e) => setUser(e.target.value)}
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="usernameNote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="usernameNote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FaInfoCircle />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed!
            </p>

            {/* Password Section */}
            <label htmlFor="password">
              Password:
              <span className={validPassword ? "valid" : "hide"}>
                <FaCheck />
              </span>
              <span className={validPassword || !password ? "hide" : "invalid"}>
                <FaTimes />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="passwordNote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p
              id="passwordNote"
              className={
                passwordFocus && !validPassword ? "instructions" : "offscreen"
              }
            >
              <FaInfoCircle />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
            </p>

            {/* Match Password */}
            <label htmlFor="confirm-password">
              Confirm Password:
              <span
                className={
                  validMatchPassword && matchPassword ? "valid" : "hide"
                }
              >
                <FaCheck />
              </span>
              <span
                className={
                  validMatchPassword || !matchPassword ? "hide" : "invalid"
                }
              >
                <FaTimes />
              </span>
            </label>
            <input
              type="password"
              id="confirm-password"
              onChange={(e) => setMatchPassword(e.target.value)}
              required
              aria-invalid={validMatchPassword ? "false" : "true"}
              aria-describedby="confirmNote"
              onFocus={() => setMatchPasswordFocus(true)}
              onBlur={() => setMatchPasswordFocus(false)}
            />
            <p
              id="confirmNote"
              className={
                matchPasswordFocus && !validMatchPassword
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FaInfoCircle />
              Must match the first password input field!
            </p>

            {/* Submit Button */}
            <button
              disabled={
                !validName || !validPassword || !validMatchPassword
                  ? true
                  : false
              }
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <Link to="/login">Login</Link>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
