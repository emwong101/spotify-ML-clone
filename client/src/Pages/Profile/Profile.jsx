import React, { useState, useEffect, useContext } from "react";
import "./Profile.scss";
import { IoIosArrowRoundBack } from "react-icons/io";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

import ProfileMenu from "../../Components/ProfileMenu/ProfileMenu";
import ProfileContent from "../../Components/ProfileContent/ProfileContent";
import axios from "axios";
import useRefreshToken from "../../useRefreshToken";

function Profile(props) {
  const [clickedItem, setClickedItem] = useState("Playlists");
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useRefreshToken();

  return (
    <div className="profile">
      {user.profile.id ? (
        <section className="profile__main">
          <div className="profile__menu">
            <ProfileMenu
              clickedItem={clickedItem}
              setClickedItem={setClickedItem}
              userData={user.profile}
            />
          </div>
          <div className="profile__content">
            <ProfileContent header={clickedItem} />
          </div>
          {/*
           * <a href="http://localhost:8080/auth/logout">
           *   <button
           *     onClick={() => {
           *       sessionStorage.clear();
           *       navigate('/landing');
           *     }}
           *   >
           *     Logout
           *   </button>
           * </a>
           */}
        </section>
      ) : (
        <>
          <>
            <p>
              <strong>This page requires authentication.</strong>
            </p>
            <a href="http://localhost:8080/auth/spotify">
              <button>Login</button>
            </a>
          </>
        </>
      )}
    </div>
  );
}

export default Profile;
