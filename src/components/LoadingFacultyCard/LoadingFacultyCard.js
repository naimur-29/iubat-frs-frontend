import React from "react";
import "./LoadingFacultyCard.css";

const Loading = ({ isSingleFaculty }) => {
  return (
    <div className={isSingleFaculty ? "loading single-faculty" : "loading"}>
      <div className="top-img"></div>
      <div className="info-container">
        <div className="name"></div>
        <div className="description">
          <div className="rating"></div>
          <div className="department"></div>
        </div>
      </div>
      <div className="rating-filler"></div>
    </div>
  );
};

export default Loading;
