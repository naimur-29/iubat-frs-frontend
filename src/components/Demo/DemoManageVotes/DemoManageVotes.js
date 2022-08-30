import React, { useState } from "react";
import "./DemoManageVotes.css";
import { useNavigate } from "react-router-dom";

const ManageVotes = () => {
  const navigate = useNavigate();

  // delete alert
  const [deleteAlert, setDeleteAlert] = useState(false);

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteVotes = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Access denied!\nYou're logged in as demo user!");
    }, 1000);
  };

  return (
    <section className="manage-votes-main-container">
      <div className="container">
        <h1 className="title">Manage Votes</h1>
        <div className="btn-container">
          <button className="btn delete" onClick={() => setDeleteAlert(true)}>
            Delete Votes
          </button>
          <button className="btn go-back" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>

      {/* Alerts */}
      <div
        className={deleteAlert ? "alert-delete active" : "alert-delete"}
        onClick={() => setDeleteAlert(false)}
      >
        <button
          className="btn"
          onClick={() => {
            handleDeleteVotes();
            setDeleteAlert(false);
          }}
        >
          Delete Everything ?
        </button>
      </div>

      {isLoading && <div className="deleting">Deleting...</div>}
    </section>
  );
};

export default ManageVotes;
