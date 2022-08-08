import React from "react";
import { useParams, Link } from "react-router-dom";

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
    <>
      <div className="teaching">
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

      <div className="marking">
        <label>{`Marking --> ${
          voteValue.marking_value ? voteValue.marking_value : 0
        }`}</label>
        {voteValue.vote ? (
          <input
            type="range"
            min={0}
            max={10}
            disabled
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

      <div className="assignment">
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
            value={voteValue.assignment_value ? voteValue.assignment_value : 0}
            onChange={(e) =>
              setVoteValue({ ...voteValue, assignment_value: e.target.value })
            }
          />
        ) : (
          <input
            type="range"
            min={0}
            max={10}
            value={voteValue.assignment_value ? voteValue.assignment_value : 0}
            onChange={(e) =>
              setVoteValue({ ...voteValue, assignment_value: e.target.value })
            }
          />
        )}
      </div>

      <div className="btn-container">
        <button className="rate" onClick={() => handleVoting()}>
          {voteValue.vote ? "Remove" : "Submit"}
        </button>
        <Link to="/faculties" className="go-back">
          Faculties
        </Link>
      </div>
    </>
  );
};

export default VotingSystem;
