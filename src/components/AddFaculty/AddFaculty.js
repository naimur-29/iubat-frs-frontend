import React, { useState } from "react";
import "./AddFaculty.css";

import FacultyCard from "../FacultyCard/FacultyCard";
import LoadingFacultyCard from "../LoadingFacultyCard/LoadingFacultyCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AddFaculty = () => {
  const [newFaculty, setNewFaculty] = useState({});
  const privateAxios = useAxiosPrivate();

  const handleSubmit = async () => {
    try {
      await privateAxios.post("/faculties", JSON.stringify(newFaculty), {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      });
      console.log("Successfully Added New Faculty!");
    } catch {}
  };

  return (
    <section className="add-faculty-main-container">
      <h1 className="title">Add New Faculty</h1>

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
          <label htmlFor="faculty name">Faculty Name:</label>
          <input
            type="text"
            onChange={(e) =>
              setNewFaculty({ ...newFaculty, name: e.target.value })
            }
          />
        </div>
        {/* Department name */}
        <div className="form">
          <label htmlFor="faculty name">Faculty's Department:</label>
          <input
            type="text"
            onChange={(e) =>
              setNewFaculty({ ...newFaculty, department: e.target.value })
            }
          />
        </div>
        {/* Image URL */}
        <div className="form">
          <label htmlFor="faculty name">Faculty's Image URL:</label>
          <input
            type="text"
            onChange={(e) =>
              setNewFaculty({ ...newFaculty, img_url: e.target.value })
            }
          />
        </div>
        <button className="btn" onClick={() => handleSubmit()}>
          Add Faculty
        </button>
      </div>
    </section>
  );
};

export default AddFaculty;
