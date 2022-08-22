import React, { useState } from "react";
import "./AddFaculty.css";

import FacultyCard from "../FacultyCard/FacultyCard";
import LoadingFacultyCard from "../LoadingFacultyCard/LoadingFacultyCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AddFaculty = () => {
  const [newFaculty, setNewFaculty] = useState({});
  const [isAdded, setIsAdded] = useState(true);
  const privateAxios = useAxiosPrivate();

  const handleSubmit = async () => {
    if (!(newFaculty?.name && newFaculty?.img_url && newFaculty?.department)) {
      alert("Enter all the info!");
      return;
    }

    try {
      setIsAdded(false);
      await privateAxios.post("/faculties", JSON.stringify(newFaculty), {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      });
      setNewFaculty({});
      setIsAdded(true);
      console.log("Successfully Added New Faculty!");
    } catch {}
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

          <button className="btn" onClick={() => handleSubmit()}>
            Add
          </button>
        </div>
      </div>
      {!isAdded && <h3 className="submit-loading">Adding...</h3>}
    </section>
  );
};

export default AddFaculty;
