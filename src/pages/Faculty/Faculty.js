import React, { useState, useEffect } from "react";
import "./Faculty.css";
import { useParams } from "react-router-dom";

import axios from "../../api/axios";

const Faculty = () => {
  const { id } = useParams();
  const [faculty, setFaculty] = useState({});

  useEffect(() => {
    const get_faculty = async () => {
      try {
        const response = await axios.get(`/faculties/${id}`);
        setFaculty(response?.data);
      } catch (err) {}
    };

    get_faculty();
  }, [id]);

  return (
    <div>
      <img src={faculty.img_url} alt="" />
    </div>
  );
};

export default Faculty;
