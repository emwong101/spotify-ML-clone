import React, { useState, useEffect, useContext } from 'react';
import './Profile.scss';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { UserContext } from '../../Context/UserContext';

import ProfileMenu from '../../Components/ProfileMenu/ProfileMenu';
import ProfileContent from '../../Components/ProfileContent/ProfileContent';
import axios from 'axios';

function Profile(props) {
  const [clickedItem, setClickedItem] = useState('Playlists');
  const [userData, setUserData] = useState({});
  const user = useContext(UserContext);

  const grabUserData = async () => {
    const { data } = await axios.get('https://api.spotify.com/v1/me/', {
      headers: { Authorization: `Bearer ${user.profile.access_token}` },
    });
    console.log(data);
    setUserData({ username: data.email, profilePicture: data.images[0].url });
  };

  useEffect(() => {
    grabUserData();
  }, []);
  return (
    <div className="profile">
      <IoIosArrowRoundBack className="profile__back-icon" />
      <section className="profile__main">
        <div className="profile__menu">
          <ProfileMenu
            clickedItem={clickedItem}
            setClickedItem={setClickedItem}
            userData={userData}
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
