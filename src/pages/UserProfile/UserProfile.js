import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { Link } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios";

const USER_DEFAULT_PROFILE_PICS = [
  "https://images.pexels.com/photos/13041978/pexels-photo-13041978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/8152008/pexels-photo-8152008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/13030358/pexels-photo-13030358.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/12769158/pexels-photo-12769158.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/4806508/pexels-photo-4806508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const UserProfile = () => {
  const [user, setUser] = useState({});
  const userId = JSON.parse(window.localStorage.getItem("userInfo"))?.id;

  const [userVotes, setUserVotes] = useState([]);
  const [votedFaculties, setVotedFaculties] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const get_user_by_id = async () => {
      try {
        const response = await axiosPrivate.get(`/users/${userId}`);
        response?.data && setUser(response?.data);
      } catch (err) {}
    };

    const get_user_votes = async () => {
      try {
        const response = await axiosPrivate.get(`/users/${userId}/votes`);
        response?.data && setUserVotes(response?.data);
      } catch (err) {}
    };

    const get_faculties = async () => {
      try {
        const response = await axios.get(`/faculties/rating`);
        response?.data.length && setVotedFaculties(response.data);
      } catch (err) {}
    };

    get_user_by_id();
    get_user_votes();
    get_faculties();
  }, [axiosPrivate, userId]);

  return (
    <section className="user-profile-main-container">
      <div className="cover-img">
        <img
          src={
            user.cover_img_url === "default"
              ? "https://images.pexels.com/photos/15286/pexels-photo.jpg"
              : user.cover_img_url
          }
          alt="cover of user!"
        />
      </div>

      <div className="user-info">
        <div className="profile-pic">
          <img
            src={
              user.img_url === "default"
                ? USER_DEFAULT_PROFILE_PICS[
                    Math.floor(Math.random() * USER_DEFAULT_PROFILE_PICS.length)
                  ]
                : user.img_url
            }
            alt="user profile pic!"
          />
        </div>

        <p className="username">{user.username}</p>

        <p className="joined-at">
          Joined at{" "}
          {user.created_at?.length >= 10 && user.created_at.slice(0, 10)}
        </p>

        <p className="description">
          {user.description === "default"
            ? "No description!"
            : user.description}
        </p>
      </div>

      <div className="votes-container">
        <h3 className="title">Faculties You've Voted!</h3>

        <p className="notice">"Only you can see this!"</p>

        {!userVotes.length && (
          <p className="notice">You haven't voted on any faculty yet!</p>
        )}

        <div className="voted-faculty-container">
          {userVotes.length ? (
            userVotes.map((item) => (
              <Link
                to={`/faculties/${item.faculty_id}`}
                className="item"
                key={item.faculty_id}
              >
                <img
                  src={
                    votedFaculties.filter(
                      (faculty) => faculty.id === item.faculty_id
                    )[0].img_url
                  }
                  alt="faculty profile pic"
                />
                <p className="name">
                  {
                    votedFaculties.filter(
                      (faculty) => faculty.id === item.faculty_id
                    )[0].name
                  }
                </p>
              </Link>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
