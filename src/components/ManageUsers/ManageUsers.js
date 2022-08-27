import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageUsers.css";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import GetUsers from "../GetUsers/GetUsers";
import UsersPagination from "../UsersPagination/UsersPagination";

const Users = () => {
  // users array
  const [users, setUsers] = useState([]);
  //current user
  const currentUser = JSON.parse(
    window.localStorage.getItem("userInfo")
  )?.username;
  // authenticated axios
  const axiosPrivate = useAxiosPrivate();
  // react router navigator
  const navigate = useNavigate();
  // status message messages
  const [statusMessage, setStatusMessage] = useState("");
  // working/loading state
  const [isDeleting, setIsDeleting] = useState(false);
  // delete user confirmation modal window state
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  // userID of target user to delete
  const [userID, setUserID] = useState(null);
  // users pagination
  const [pageNo, setPageNo] = useState(1);
  const [pageLimit] = useState(10);
  const [skip, setSkip] = useState(0);

  // get users from api
  const getUsers = useCallback(async () => {
    try {
      const response = await axiosPrivate.get(`users`);
      response?.data && setUsers(response.data);
    } catch (err) {}
  }, [axiosPrivate]);

  // delete users by id
  const handleDeleteUser = async () => {
    setIsDeleting(true);
    try {
      const res = await axiosPrivate.delete(`users/${userID}`);
      res?.data && setStatusMessage(res);
      getUsers();
    } catch {}
    setIsDeleting(false);
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <section className="manage-users-container">
      <div className="main-container">
        <h1 className="title">Manage Users</h1>

        <GetUsers
          users={users}
          currentUser={currentUser}
          isDeleteModalActive={isDeleteModalActive}
          setIsDeleteModalActive={setIsDeleteModalActive}
          setUserID={setUserID}
          pageLimit={pageLimit}
          skip={skip}
        />

        {/* users pagination & other buttons */}
        <div className="btn-container">
          <UsersPagination
            pageLimit={pageLimit}
            pageNo={pageNo}
            users={users}
            setPageNo={setPageNo}
            setSkip={setSkip}
          />
          <button className="btn" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal/lightbox */}
      <div
        className={
          isDeleteModalActive
            ? "confirmation-container active"
            : "confirmation-container"
        }
        onClick={() => setIsDeleteModalActive(false)}
      >
        <button className="btn" onClick={() => handleDeleteUser()}>
          Delete
        </button>
      </div>

      {isDeleting && <h3 className="deleting">Deleting...</h3>}
    </section>
  );
};

export default Users;
