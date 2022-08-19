import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./VotingSystem.css";

import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const VotingSystem = ({ voteValue, setVoteValue, setFaculty }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const userId = JSON.parse(window.localStorage.getItem("userInfo")).id;

  const [isSubmitted, setIsSubmitted] = useState(true);

  const handleVoting = async () => {
    setIsSubmitted(false);
    if (
      voteValue.teaching_value >= 0 &&
      voteValue.marking_value >= 0 &&
      voteValue.assignment_value >= 0 &&
      voteValue.teaching_value <= 10 &&
      voteValue.marking_value <= 10 &&
      voteValue.assignment_value <= 10
    ) {
      try {
        const res = await axiosPrivate.post(
          `/faculties/${id}/vote`,
          JSON.stringify(voteValue),
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(res?.data);
      } catch (err) {}

      try {
        const response = await axiosPrivate.get(
          `/faculties/${id}/vote/${userId}`
        );

        setIsSubmitted(true);
        setVoteValue(response?.data);
      } catch (err) {}
    }

    try {
      const response = await axios.get(`/faculties/${id}`);
      setFaculty(response?.data);
    } catch (err) {}
  };

  return (
    <div className="container">
      <div
        className={
          voteValue?.vote ? "votes-container submitted" : "votes-container"
        }
      >
        <div className="vote">
          <label>
            {`Teaching --> ${
              voteValue?.teaching_value ? voteValue?.teaching_value : 0
            }`}
          </label>
          {voteValue?.vote ? (
            <input
              type="range"
              min={0}
              max={10}
              className="disabled"
              disabled
              value={voteValue?.teaching_value ? voteValue?.teaching_value : 0}
              onChange={(e) =>
                setVoteValue({ ...voteValue, teaching_value: e.target?.value })
              }
            />
          ) : (
            <input
              type="range"
              min={0}
              max={10}
              value={voteValue?.teaching_value ? voteValue?.teaching_value : 0}
              onChange={(e) =>
                setVoteValue({ ...voteValue, teaching_value: e.target?.value })
              }
            />
          )}
        </div>

        <div className="vote">
          <label>{`Marking --> ${
            voteValue?.marking_value ? voteValue?.marking_value : 0
          }`}</label>
          {voteValue?.vote ? (
            <input
              type="range"
              min={0}
              max={10}
              disabled
              className="disabled"
              value={voteValue?.marking_value ? voteValue?.marking_value : 0}
              onChange={(e) =>
                setVoteValue({ ...voteValue, marking_value: e.target?.value })
              }
            />
          ) : (
            <input
              type="range"
              min={0}
              max={10}
              value={voteValue?.marking_value ? voteValue?.marking_value : 0}
              onChange={(e) =>
                setVoteValue({ ...voteValue, marking_value: e.target?.value })
              }
            />
          )}
        </div>

        <div className="vote">
          <label>
            {`Assignment --> ${
              voteValue?.assignment_value ? voteValue?.assignment_value : 0
            }`}
          </label>
          {voteValue?.vote ? (
            <input
              type="range"
              min={0}
              max={10}
              disabled
              className="disabled"
              value={
                voteValue?.assignment_value ? voteValue?.assignment_value : 0
              }
              onChange={(e) =>
                setVoteValue({
                  ...voteValue,
                  assignment_value: e.target?.value,
                })
              }
            />
          ) : (
            <input
              type="range"
              min={0}
              max={10}
              value={
                voteValue?.assignment_value ? voteValue?.assignment_value : 0
              }
              onChange={(e) =>
                setVoteValue({ ...voteValue, assignment_value: e.target.value })
              }
            />
          )}
        </div>
      </div>

      <div className="btn-container">
        <button className="btn" onClick={() => handleVoting()}>
          {voteValue?.vote ? "Remove" : "Submit"}
        </button>
        <button to="/faculties" className="btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
      {!isSubmitted && (
        <h3 className="submit-loading">
          {voteValue?.vote ? "Removing" : "Submitting"}...
        </h3>
      )}
    </div>
  );
};

export default VotingSystem;
