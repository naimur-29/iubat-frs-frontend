import React from "react";
import { useParams, Link } from "react-router-dom";
import "./VotingSystem.css";

import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const VotingSystem = ({ voteValue, setVoteValue, setFaculty }) => {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const userId = JSON.parse(window.localStorage.getItem("userInfo")).id;

  const handleVoting = async () => {
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
      <div className="votes-container">
        <div className="vote">
          <label>
            {`Teaching --> ${
              voteValue.teaching_value ? voteValue.teaching_value : 0
            }`}
          </label>
          {voteValue.vote ? (
            <input
              type="range"
              min={0}
              max={10}
              className="disabled"
              disabled
              value={voteValue.teaching_value ? voteValue.teaching_value : 0}
              onChange={(e) =>
                setVoteValue({ ...voteValue, teaching_value: e.target.value })
              }
            />
          ) : (
            <input
              type="range"
              min={0}
              max={10}
              value={voteValue.teaching_value ? voteValue.teaching_value : 0}
              onChange={(e) =>
                setVoteValue({ ...voteValue, teaching_value: e.target.value })
              }
            />
          )}
        </div>

        <div className="vote">
          <label>{`Marking --> ${
            voteValue.marking_value ? voteValue.marking_value : 0
          }`}</label>
          {voteValue.vote ? (
            <input
              type="range"
              min={0}
              max={10}
              disabled
              className="disabled"
              value={voteValue.marking_value ? voteValue.marking_value : 0}
              onChange={(e) =>
                setVoteValue({ ...voteValue, marking_value: e.target.value })
              }
            />
          ) : (
            <input
              type="range"
              min={0}
              max={10}
              value={voteValue.marking_value ? voteValue.marking_value : 0}
              onChange={(e) =>
                setVoteValue({ ...voteValue, marking_value: e.target.value })
              }
            />
          )}
        </div>

        <div className="vote">
          <label>
            {`Assignment --> ${
              voteValue.assignment_value ? voteValue.assignment_value : 0
            }`}
          </label>
          {voteValue.vote ? (
            <input
              type="range"
              min={0}
              max={10}
              disabled
              className="disabled"
              value={
                voteValue.assignment_value ? voteValue.assignment_value : 0
              }
              onChange={(e) =>
                setVoteValue({ ...voteValue, assignment_value: e.target.value })
              }
            />
          ) : (
            <input
              type="range"
              min={0}
              max={10}
              value={
                voteValue.assignment_value ? voteValue.assignment_value : 0
              }
              onChange={(e) =>
                setVoteValue({ ...voteValue, assignment_value: e.target.value })
              }
            />
          )}
        </div>
      </div>

      <div className="btn-container">
        <Link
          to={`/faculties/${id}`}
          className="btn"
          onClick={() => handleVoting()}
        >
          {voteValue.vote ? "Remove" : "Submit"}
        </Link>
        <Link to="/faculties" className="btn">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default VotingSystem;
