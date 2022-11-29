import React, { useState, useEffect } from "react";
import "./FacultyCard.css";

const Card = ({ item }) => {
  const [avgRating, setAvgRating] = useState(0);
  const [ratingStatus, setRatingStatus] = useState("Unavailable!");

  useEffect(() => {
    const avg = (
      (item.teaching_rate + item.marking_rate + item.assignment_rate) /
      3
    ).toFixed(1);

    setAvgRating(avg);
    setRatingStatus(
      avg > 0
        ? avg > 7
          ? "Excellent!"
          : avg > 5
          ? "Impressive!"
          : "Good!"
        : "Unavailable!"
    );
  }, [item]);

  return (
    <div className="card-container">
      <img
        loading="lazy"
        className="top-img"
        src={item.img_url}
        alt="profile pic of faculty"
      />
      <div className="info-container">
        <p className="name">{item.name}</p>
        <div className="description">
          <p className="rating">
            {isNaN(avgRating)
              ? "Feedback Unavailable!"
              : `Overall Feedback ${ratingStatus}`}
          </p>
          <p className="department">{item.department}</p>
        </div>
      </div>
      <div className="rating-filler"></div>
    </div>
  );
};

export default Card;
