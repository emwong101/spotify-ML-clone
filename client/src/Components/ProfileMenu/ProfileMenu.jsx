import React, { useState } from 'react';
import './ProfileMenu.scss';

function ProfileMenu({ clickedItem, setClickedItem }) {
  return (
    <div className="profile-menu">
      <div className="profile-menu__pfp"></div>
      <p className="profile-menu__username">USERNAME</p>
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
