import React from "react";
import "./Admin.css";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="admin-main-container">
      <div className="links-container">
        <h1 className="title">Admin Panel</h1>
        <Link to="users" className="link">
          Manage Users
        </Link>
        <Link to="faculties" className="link">
          Manage Faculties
        </Link>
        <Link to="votes" className="link">
          Manage Votes
        </Link>
        <Link to="/" className="link">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default Admin;
