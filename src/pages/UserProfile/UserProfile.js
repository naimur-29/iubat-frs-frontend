import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import { AiOutlineDoubleLeft } from "react-icons/ai";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios";

const USER_DEFAULT_COVER_PICS = [
  "https://images5.alphacoders.com/495/thumb-1920-495521.jpg",
  "https://images.alphacoders.com/761/thumb-1920-761506.jpg",
  "https://images4.alphacoders.com/107/thumb-1920-1070805.jpg",
  "https://images3.alphacoders.com/854/thumb-1920-854067.png",
  "https://images6.alphacoders.com/920/thumb-1920-920653.jpg",
  "https://images5.alphacoders.com/114/thumb-1920-1141105.jpg",
  "https://images4.alphacoders.com/114/thumb-1920-1140731.jpg",
  "https://images6.alphacoders.com/123/thumb-1920-1231480.jpg",
  "https://images7.alphacoders.com/555/thumb-1920-555562.jpg",
];

const USER_DEFAULT_PROFILE_PICS = [
  "https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/209037/pexels-photo-209037.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1629777/pexels-photo-1629777.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/3610168/pexels-photo-3610168.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/1049622/pexels-photo-1049622.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/2932688/pexels-photo-2932688.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/2835623/pexels-photo-2835623.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/7788609/pexels-photo-7788609.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/2315712/pexels-photo-2315712.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/840326/pexels-photo-840326.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/4588005/pexels-photo-4588005.jpeg?auto=compress&cs=tinysrgb&w=300",
];

const UserProfile = () => {
  const [user, setUser] = useState({});
  const userId = JSON.parse(window.localStorage.getItem("userInfo"))?.id;

  const [menu, setMenu] = useState(false);

  const [userVotes, setUserVotes] = useState(new Array(1).fill(null));
  const [votedFaculties, setVotedFaculties] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  const [userProfilePicUrl] = useState(
    USER_DEFAULT_PROFILE_PICS[
      Math.floor(Math.random() * USER_DEFAULT_PROFILE_PICS.length)
    ]
  );

  const [userCoverPicUrl] = useState(
    USER_DEFAULT_COVER_PICS[
      Math.floor(Math.random() * USER_DEFAULT_COVER_PICS.length)
    ]
  );

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
      } catch (err) {
        setUserVotes([]);
      }
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
      <div className={`overlay ${menu ? "active" : ""}`}></div>

      <div className={`menu-container ${menu ? "active" : ""}`}>
        <ul className="btn-container">
          {/* <Link to="/" className="btn">
            Change Profile Info
          </Link>
          <Link to="/" className="btn">
            Change Password
          </Link> */}
          <Link to={`accdel/${userId}`} className="btn">
            Delete Your Account
          </Link>
        </ul>
      </div>

      <div
        className={`menu-nav ${menu ? "active" : ""}`}
        onClick={() => setMenu(!menu)}
      >
        <AiOutlineDoubleLeft className="icon" />
      </div>

      <div className="cover-img">
        <img
          src={
            user?.cover_img_url === "default"
              ? userCoverPicUrl
              : user?.cover_img_url
          }
          alt=""
        />
      </div>

      <div className="user-info">
        <div className="profile-pic">
          <img
            src={
              user?.img_url === "default" ? userProfilePicUrl : user?.img_url
            }
            alt=""
          />
        </div>

        <p className="username">{user?.username}</p>

        {user?.created_at && (
          <p className="joined-at">
            Joined on{" "}
            {user?.created_at?.length >= 10 && user?.created_at.slice(0, 10)}
          </p>
        )}

        <p className="description">
          {user?.description === "default"
            ? "No description!"
            : user?.description}
        </p>
      </div>

      <div className="votes-container">
        <h3 className="title">Faculties You've Voted!</h3>

        <p className="notice">"Only you can see this!"</p>

        {!userVotes.length && (
          <p className="notice">You haven't rated any faculty yet!</p>
        )}

        <div className="voted-faculty-container">
          {userVotes[0]
            ? userVotes.map((item) => (
                <Link
                  to={`/faculties/${item?.faculty_id}`}
                  className="item"
                  key={item?.faculty_id}
                >
                  <img
                    src={
                      votedFaculties.filter(
                        (faculty) => faculty?.id === item?.faculty_id
                      )[0]?.img_url
                    }
                    alt="faculty profile pic"
                  />
                  <p className="name">
                    {
                      votedFaculties.filter(
                        (faculty) => faculty?.id === item?.faculty_id
                      )[0]?.name
                    }
                  </p>
                </Link>
              ))
            : userVotes.map((item, index) => (
                <div className="item" key={index}>
                  <div className="loading"></div>
                  <div className="name loading"></div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
