import React, { useState, useEffect, useContext } from 'react';
import './Profile.scss';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { UserContext } from '../../Context/UserContext';

import ProfileMenu from '../../Components/ProfileMenu/ProfileMenu';
import ProfileContent from '../../Components/ProfileContent/ProfileContent';
import axios from 'axios';
import useRefreshToken from '../../useRefreshToken';

function Profile(props) {
  const [clickedItem, setClickedItem] = useState('Playlists');
  const user = useContext(UserContext);

  // const grabProfile = () => {
  //   //axios call here
  //   const response = axios
  //     .get('http://localhost:8080/auth/profile', {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       user.setProfileData(res.data);
  //       localStorage.setItem('user profile', JSON.stringify(res.data));
  //       top3ArtistsAllTime(res.data.access_token);
  //       console.log(res.data);
  //     });
  // };

  // const url = 'https://api.spotify.com/v1/me/top/artists';

  // const top3ArtistsAllTime = async (access_token) => {
  //   const query = 'long_term';
  //   const topArtistID = [];

  //   const { data } = await axios.get(`${url}?time_range=${query}&limit=3`, {
  //     headers: {
  //       Authorization: `Bearer ${access_token}`,
  //     },
  //   });

  //   data.items.forEach((artist) => {
  //     topArtistID.push(artist.id);
  //   });

  //   localStorage.setItem('top artists', JSON.stringify(topArtistID));
  //   user.setTopArtists(topArtistID);
  // };

  const grabNewAccessToken = () => {
    const response = axios
      .get('http://localhost:8080/refresh', { withCredentials: true })
      .then((res) => {
        console.log(res);
        user.setProfileData(res.data);
        localStorage.setItem('user profile', JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   grabProfile();
  // }, []);

  return (
    <div className="profile">
      <IoIosArrowRoundBack className="profile__back-icon" />
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
            <button onClick={grabNewAccessToken}>Refresh</button>
          </div>
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
