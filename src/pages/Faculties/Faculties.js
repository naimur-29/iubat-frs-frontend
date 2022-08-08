import React, { useState, useEffect } from "react";
import "./Faculties.css";
import { Link } from "react-router-dom";

import axios from "../../api/axios";
import FacultyCard from "../../components/FacultyCard/FacultyCard";

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
              <FacultyCard item={item} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Faculties;
