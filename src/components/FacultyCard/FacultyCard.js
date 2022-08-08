import React from "react";
import "./FacultyCard.css";

const Card = ({ item }) => {
  return (
    <div className="card-container">
      <img
        className="top-img"
        src={item.img_url}
        alt="profile pic of faculty"
      />
      <div className="info-container">
        <p className="name">{item.name}</p>
        <div className="description">
          <p className="rating">
            Average Rating{" "}
            {(
              (item.teaching_rate + item.marking_rate + item.assignment_rate) /
              3
            ).toFixed(1)}
            /10
          </p>
          <p className="department">{item.department}</p>
        </div>
      </div>
      <div className="rating-filler"></div>
    </div>
  );
};

export default Card;
