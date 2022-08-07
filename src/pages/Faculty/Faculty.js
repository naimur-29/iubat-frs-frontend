import React from "react";
import "./Faculty.css";
import { useParams } from "react-router-dom";

import { FacultiesData } from "../../data/FacultiesData";

const Faculty = () => {
  const { id } = useParams();
  const data = { ...FacultiesData[id - 1] };

  return (
    <div>
      <img src={data.img_url} alt="" />
    </div>
  );
};

export default Faculty;
