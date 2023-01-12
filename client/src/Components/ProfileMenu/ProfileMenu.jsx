import React, { useState } from 'react';
import './ProfileMenu.scss';

function ProfileMenu({ clickedItem, setClickedItem, userData }) {
  return (
    <div className="profile-menu">
      <img
        className="profile-menu__pfp"
        src={userData.profile_picture}
        alt="profile picture"
      />
      <p className="profile-menu__username">{userData.email}</p>
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
