import React, { useState, useEffect, useCallback } from "react";
import "./Faculties.css";
import { Link } from "react-router-dom";

import axios from "../../api/axios";
import FacultyCard from "../../components/FacultyCard/FacultyCard";
import LoadingFacultyCard from "../../components/LoadingFacultyCard/LoadingFacultyCard";

// departments
const DEPARTMENTS = [
  ["Bachelors of Computer Science & Engineering", "BCSE"],
  ["Master of Business Administration", "MBA & BBA"],
  ["Bachelor of Science in Civil Engineering", "BSCE"],
  ["Bachelor of Science in Mechanical Engineering", "BSME"],
  ["Bachelor of Electrical & Electronics Engineering", "BEEE"],
  ["Bachelor of Science in Nursing", "BSN"],
  ["Bachelor of Arts in Tourism and Hospitality Management", "BATHM"],
  ["Bachelor of Science in Agriculture", "BSAg"],
  ["Bachelor of Arts in Economics", "BAEcon"],
  ["Bachelor of Arts in English", "BA (English)"],
  ["Quantitative Sciences & Mathematics", "QSM (Math)"],
];

const Faculties = () => {
  const [faculties, setFaculties] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // department state
  const [facultyDepartment, setFacultyDepartment] = useState(DEPARTMENTS[0][0]);

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // select department state
  const [isSelectDepartmentActive, setIsSelectDepartmentActive] =
    useState(false);

  const get_faculties = useCallback(async () => {
    setIsLoading(true);
    setFaculties(new Array(20).fill(null));

    try {
      const response = await axios.get(
        `/faculties/rating?dep=${facultyDepartment.replace(" ", "+")}`
      );
      response?.data?.length && setFaculties(response.data);
    } catch (err) {
      setFaculties([]);
    }

    setIsLoading(false);
  }, [facultyDepartment]);

  useEffect(() => {
    get_faculties();
  }, [get_faculties]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="faculties-main-container">
      <div className="filter-container">
        {/* Search faculties */}
        <input
          type="text"
          className="search-input"
          placeholder="Search Faculties"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
        />

        {/* Filter Faculties by Department */}
        <div
          className={
            isSelectDepartmentActive
              ? "current-department active"
              : "current-department"
          }
          onClick={() => setIsSelectDepartmentActive(!isSelectDepartmentActive)}
        >
          {facultyDepartment}
        </div>

        {/* departments selector modal */}
        <div
          className={
            isSelectDepartmentActive
              ? "departments-container active"
              : "departments-container"
          }
        >
          {DEPARTMENTS.map((item, index) => (
            <div
              className="department"
              key={index}
              onClick={() => {
                setFaculties([]);
                setFacultyDepartment(item[0]);
                setIsSelectDepartmentActive(false);
                get_faculties();
                window.scrollTo(0, 0);
              }}
            >
              {item[1]}
            </div>
          ))}
        </div>
      </div>

      {/* Render Faculties */}
      <div className="faculties-card-container">
        {isLoading ? (
          faculties.map((item, index) => <LoadingFacultyCard key={index} />)
        ) : faculties?.length ? (
          faculties
            .filter((element) =>
              element.name.toLowerCase().includes(searchInput)
            )
            .map((item) => (
              <Link
                to={`/faculties/${item.id}`}
                key={item.id}
                onClick={() => window.scrollTo(0, 0)}
              >
                <FacultyCard item={item} />
              </Link>
            ))
        ) : (
          <h3 className="no-faculties">
            Connection Lost !
            <br />
            Refresh The Page
          </h3>
        )}
      </div>
    </section>
  );
};

export default Faculties;
