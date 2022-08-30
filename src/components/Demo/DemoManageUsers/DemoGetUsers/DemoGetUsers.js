import React from "react";
import "./DemoGetUsers.css";

const GetUsers = ({
  users,
  currentUser,
  setIsDeleteModalActive,
  setUserID,
  isDeleteModalActive,
  pageLimit,
  skip,
}) => {
  return (
    <>
      {users?.length ? (
        <ul className="users-container">
          {users.length &&
            users
              .filter((item) => item.username !== currentUser)
              .map(
                (user, index) =>
                  index < pageLimit + skip &&
                  index >= skip && (
                    <li key={user.id} className="user">
                      <span className="username">
                        {index + 1}. {user.username}
                      </span>
                      <button
                        className="delete-btn"
                        onClick={() => {
                          setIsDeleteModalActive(!isDeleteModalActive);
                          setUserID(index);
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  )
              )}
        </ul>
      ) : (
        <p className="no-users">No users to display!</p>
      )}
    </>
  );
};

export default GetUsers;
