import React from "react";
import "./UsersPagination.css";

const UsersPagination = ({ pageLimit, pageNo, users, setPageNo, setSkip }) => {
  return (
    <div className="pagination-container">
      <button
        className="btn"
        onClick={() => {
          setPageNo(1);
          setSkip(0);
        }}
      >
        {"<<"}
      </button>
      <button
        className="btn"
        onClick={() => {
          setPageNo((prev) => (prev > 1 ? prev - 1 : prev));

          // for pagination
          setSkip((prev) => (prev > 0 ? prev - pageLimit : 0));
        }}
      >
        {"<"}
      </button>
      <button className="btn">{pageNo < 10 ? "0" + pageNo : pageNo}</button>
      <button
        className="btn"
        onClick={() => {
          setPageNo((prev) =>
            prev >= Math.ceil((users.length - 1) / pageLimit) ? prev : prev + 1
          );

          // for pagination
          setSkip((prev) =>
            prev > (Math.ceil((users.length - 1) / pageLimit) - 2) * pageLimit
              ? (Math.ceil((users.length - 1) / pageLimit) - 1) * pageLimit
              : prev + pageLimit
          );
        }}
      >
        {">"}
      </button>
      <button
        className="btn"
        onClick={() => {
          setPageNo(Math.ceil((users.length - 1) / pageLimit));
          setSkip((Math.ceil((users.length - 1) / pageLimit) - 1) * pageLimit);
        }}
      >
        {">>"}
      </button>
    </div>
  );
};

export default UsersPagination;
