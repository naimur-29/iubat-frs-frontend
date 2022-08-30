import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./DemoManageUsers.css";

import GetUsers from "./DemoGetUsers/DemoGetUsers";
import UsersPagination from "../../UsersPagination/UsersPagination";
import { data } from "./UsersDemoData";

const Users = () => {
  // users array
  const [users, setUsers] = useState([]);
  //current user
  const currentUser = JSON.parse(
    window.localStorage.getItem("userInfo")
  )?.username;
  // userID of target user to delete
  const [userID, setUserID] = useState(null);
  // react router navigator
  const navigate = useNavigate();
  // working/loading state
  const [isDeleting, setIsDeleting] = useState(false);
  // delete user confirmation modal window state
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  // users pagination
  const [pageNo, setPageNo] = useState(1);
  const [pageLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // get users from data
  const getUsers = useCallback(async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setUsers(data);
    }, 1000);
  }, []);

  // delete users by id
  const handleDeleteUser = async (id) => {
    setIsDeleting(true);

    // remove user from users state array
    setTimeout(() => {
      setIsDeleting(false);
      users.splice(id, 1);
    }, 1000);
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
          isLoading={isLoading}
        />

        {/* users pagination & other buttons */}
        <div className="btn-container">
          {users?.length ? (
            <UsersPagination
              pageLimit={pageLimit}
              pageNo={pageNo}
              users={users}
              setPageNo={setPageNo}
              setSkip={setSkip}
            />
          ) : (
            <></>
          )}
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
        <button className="btn" onClick={() => handleDeleteUser(userID)}>
          Delete
        </button>
      </div>

      {isDeleting && <h3 className="loading">Deleting...</h3>}
      {isLoading && <h3 className="loading">Loading...</h3>}
    </section>
  );
};

export default Users;
