import React, { useState, useEffect } from "react";
import "./Faculty.css";
import { useParams, Navigate } from "react-router-dom";

import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import FacultyCard from "../../components/FacultyCard/FacultyCard";
import VotingSystem from "../../components/VotingSystem/VotingSystem";
import LoadingFacultyCard from "../../components/LoadingFacultyCard/LoadingFacultyCard";

const ratingMap = (num) =>
  num > 0
    ? num > 7
      ? "Excellent!"
      : num > 5
      ? "Impressive!"
      : "Good!"
    : "Unavailable!";

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

    window.scrollTo(0, 0);

    get_faculty();
    get_vote();
  }, [id, userId, axiosPrivate]);

  return (
    <div className="faculty-main-container">
      <div className="faculty-info-container">
        <div className="faculty-profile">
          {faculty?.name ? (
            <FacultyCard item={faculty} />
          ) : (
            <LoadingFacultyCard isSingleFaculty />
          )}
        </div>

        <div className="detailed-ratings-container">
          <h3 className="title">Detailed Feedback Information</h3>
          <div className="ratings-info">
            <div className="left">
              <p>Teaching</p>
              <p>Communication</p>
              <p>Engagement</p>
            </div>
            <div className="right">
              <p>{ratingMap(faculty?.teaching_rate)}</p>
              <p>{ratingMap(faculty?.marking_rate)}</p>
              <p>{ratingMap(faculty?.assignment_rate)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="voting-container">
        <h3 className="title">Your Feedback Matters</h3>
        <p className="info">
          You've to provide feedback after every term exam except Final. Your
          feedback will reach your faculty & your info is hidden. These
          information refresh after First & Midterm.
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
