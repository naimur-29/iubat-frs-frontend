import React, { useState, useEffect } from "react";
import "./Faculties.css";
import { Link } from "react-router-dom";

import axios from "../../api/axios";

const Faculties = () => {
  const [faculties, setFaculties] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const get_faculties = async () => {
      try {
        const response = await axios.get(`/faculties/rating?skip=${skip}`);
        response?.data.length && setFaculties(response.data);
      } catch (err) {}
    };

    get_faculties();
  }, [skip]);

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
        {faculties
          .filter((element) => element.name.toLowerCase().includes(searchInput))
          .map((item) => (
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
