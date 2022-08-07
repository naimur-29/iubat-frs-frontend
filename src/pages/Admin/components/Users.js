import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const GET_USERS_URL = "users";

const Users = () => {
  const [users, setUsers] = useState([]);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(GET_USERS_URL, {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
      } catch (err) {
        err?.code === "ERR_BAD_REQUEST" &&
          navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, navigate, location]);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display!</p>
      )}
    </article>
  );
};

export default Users;
