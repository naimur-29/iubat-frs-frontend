import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const userId = JSON.parse(window.localStorage.getItem("userInfo"))?.id;

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const get_user_by_id = async () => {
      try {
        const response = await axiosPrivate.get(`/users/${userId}`);
        setUser(response?.data);
      } catch (err) {}
    };

    get_user_by_id();
  }, [axiosPrivate, userId]);

  return (
    <section className="userprofile-main-container">{user.username}</section>
  );
};

export default UserProfile;
