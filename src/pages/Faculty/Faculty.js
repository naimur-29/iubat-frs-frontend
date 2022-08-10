import React, { useState, useEffect } from "react";
import "./Faculty.css";
import { useParams, Navigate } from "react-router-dom";

import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import FacultyCard from "../../components/FacultyCard/FacultyCard";
import VotingSystem from "../../components/VotingSystem/VotingSystem";

const Faculty = () => {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const userId = JSON.parse(window.localStorage.getItem("userInfo")).id;

  const [faculty, setFaculty] = useState({});
  const [voteValue, setVoteValue] = useState({});

  useEffect(() => {
    const get_faculty = async () => {
      try {
        const response = await axios.get(`/faculties/${id}`);
        setFaculty(response?.data);
      } catch (err) {}
    };

    const get_vote = async () => {
      try {
        const response = await axiosPrivate.get(
          `/faculties/${id}/vote/${userId}`
        );
        setVoteValue(response?.data);
      } catch (err) {
        window.localStorage.removeItem("userInfo");
        window.localStorage.setItem("loggedIn", "");
        <Navigate to="/home" />;
      }
    };

    get_faculty();
    get_vote();
  }, [id, userId, axiosPrivate]);

  return (
    <div className="faculty-main-container">
      <div className="faculty-info-container">
        <div className="faculty-profile">
          <FacultyCard item={faculty} />
        </div>

        <div className="detailed-ratings-container">
          <h3 className="title">Detailed Ratings Information</h3>
          <div className="ratings-info">
            <div className="left">
              <p>Teaching</p>
              <p>Marking</p>
              <p>Assignment</p>
            </div>
            <div className="right">
              <p>{`${faculty?.teaching_rate}/10`}</p>
              <p>{`${faculty?.marking_rate}/10`}</p>
              <p>{`${faculty?.assignment_rate}/10`}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="voting-container">
        <h3 className="title">Rate This Faculty</h3>
        <p className="info">
          You can only rate once! The ratings refresh at the starting of each
          semester.
        </p>
        <p className="notice">
          Do this on your own choice! We're not responsible for what happens
          next!
        </p>

        <div className="voting-system">
          <VotingSystem
            voteValue={voteValue}
            setVoteValue={setVoteValue}
            setFaculty={setFaculty}
          />
        </div>
      </div>
    </div>
  );
};

export default Faculty;
