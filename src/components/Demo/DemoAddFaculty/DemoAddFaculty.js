import React, { useState } from "react";
import "./DemoAddFaculty.css";
import { useNavigate } from "react-router-dom";

import FacultyCard from "../../FacultyCard/FacultyCard";
import LoadingFacultyCard from "../../LoadingFacultyCard/LoadingFacultyCard";

const AddFaculty = () => {
  const [newFaculty, setNewFaculty] = useState({});
  const [isAdded, setIsAdded] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (newFaculty?.name && newFaculty?.img_url && newFaculty?.department) {
      setTimeout(() => {
        setIsAdded(true);
        alert("Access denied!\nYou're logged in as demo!");
      }, 1000);
      setIsAdded(false);
    } else {
      alert("Fill up all the info!");
    }
  };

  return (
    <section className="add-faculty-main-container">
      <h1 className="title">New Faculty</h1>

      <div className="container">
        {/* If new faculty info available render FacultyCard component with that info else render LoadingFacultyCard placeholder */}
        {newFaculty?.name && newFaculty?.img_url && newFaculty?.department ? (
          <FacultyCard item={newFaculty} />
        ) : (
          <LoadingFacultyCard isSingleFaculty />
        )}

        {/* Faculty Info form */}
        {/* Name */}
        <div className="form-container">
          <div className="form">
            <label htmlFor="faculty name">{"Faculty Name -->"}</label>
            <input
              placeholder="Ex: Rashedul Islam"
              type="text"
              value={newFaculty?.name ? newFaculty.name : ""}
              onChange={(e) =>
                setNewFaculty({ ...newFaculty, name: e.target.value })
              }
            />
          </div>
          {/* Department name */}
          <div className="form">
            <label htmlFor="faculty name">{"Faculty's Department -->"}</label>
            <input
              placeholder="Ex: Bachelors of Computer Science & Engineering"
              type="text"
              value={newFaculty?.department ? newFaculty.department : ""}
              onChange={(e) =>
                setNewFaculty({ ...newFaculty, department: e.target.value })
              }
            />
          </div>
          {/* Image URL */}
          <div className="form">
            <label htmlFor="faculty name">{"Faculty's Image URL -->"}</label>
            <input
              placeholder="Ex: http://www.xyz.com"
              type="text"
              value={newFaculty?.img_url ? newFaculty.img_url : ""}
              onChange={(e) =>
                setNewFaculty({ ...newFaculty, img_url: e.target.value })
              }
            />
          </div>

          <div className="btn-container">
            <button className="btn" onClick={() => handleSubmit()}>
              Add
            </button>
            <button className="btn" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>
      </div>
      {!isAdded && <h3 className="submit-loading">Adding...</h3>}
    </section>
  );
};

export default AddFaculty;
