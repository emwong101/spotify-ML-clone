import React, { useState, useEffect } from 'react';
import './Profile.scss';
import { IoIosArrowRoundBack } from 'react-icons/io';

import ProfileMenu from '../../Components/ProfileMenu/ProfileMenu';
import ProfileContent from '../../Components/ProfileContent/ProfileContent';
function Profile(props) {
  const [clickedItem, setClickedItem] = useState('Playlists');
  return (
    <div className="profile">
      <IoIosArrowRoundBack className="profile__back-icon" />
      <section className="profile__main">
        <div className="profile__menu">
          <ProfileMenu
            clickedItem={clickedItem}
            setClickedItem={setClickedItem}
          />
        </div>
        <div className="profile__content">
          <ProfileContent header={clickedItem} />
        </div>
      </section>
    </div>
  );
}

export default Profile;
