import React, { useState } from "react";
import "./ManageVotes.css";
import { useNavigate } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ManageVotes = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  // delete alert
  const [deleteAlert, setDeleteAlert] = useState(false);

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // error message
  const [statusMessage, setStatusMessage] = useState("");

  const handleDeleteVotes = async () => {
    setIsLoading(true);

    try {
      const res = await axiosPrivate.delete("/votes");
      res?.data && setStatusMessage(res.data);
    } catch {}

    console.log(statusMessage);
    setIsLoading(false);
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
