import React, { useState, useEffect } from "react";
import "./FacultyCard.css";

const Card = ({ item }) => {
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const avg = (
      (item.teaching_rate + item.marking_rate + item.assignment_rate) /
      3
    ).toFixed(1);

    setAvgRating(avg);
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
              ? "Rating Unavailable!"
              : `Average Rating ${avgRating} / 10`}
          </p>
          <p className="department">{item.department}</p>
        </div>
      </div>
      <div className="rating-filler"></div>
    </div>
  );
};

export default Card;
