import React, { useState } from "react";
import "./Faculties.css";
import { Link } from "react-router-dom";

import { FacultiesData } from "../../data/FacultiesData";

const Faculties = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="faculties-main-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search by name"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
      />
      <div className="faculties-card-container">
        {FacultiesData.filter((element) =>
          element.name.toLowerCase().includes(searchInput)
        ).map((item) => (
          <Link to={`/faculties/${item.id}`} key={item.id}>
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
                      (item.teaching_rate +
                        item.marking_rate +
                        item.assignment_rate) /
                      3
                    ).toFixed(1)}
                    /10
                  </p>
                  <p className="department">{item.department}</p>
                </div>
              </div>
              <div className="rating-filler"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Faculties;
