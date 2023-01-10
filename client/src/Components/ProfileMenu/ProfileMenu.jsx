import React, { useState } from 'react';
import './ProfileMenu.scss';

function ProfileMenu({ clickedItem, setClickedItem, userData }) {
  console.log(userData);
  return (
    <div className="profile-menu">
      <img
        className="profile-menu__pfp"
        src={userData.profilePicture}
        alt="profile picture"
      />
      <p className="profile-menu__username">{userData.username}</p>
      <p
        className={
          clickedItem === 'Playlists'
            ? 'profile-menu__menu-item--underlined'
            : 'profile-menu__menu-item'
        }
        onClick={() => {
          setClickedItem('Playlists');
        }}
      >
        Playlists
      </p>
      <p
        className={
          clickedItem === 'Stats'
            ? 'profile-menu__menu-item--underlined'
            : 'profile-menu__menu-item'
        }
        onClick={() => {
          setClickedItem('Stats');
        }}
      >
        Stats
      </p>
    </div>
  );
}

export default ProfileMenu;
