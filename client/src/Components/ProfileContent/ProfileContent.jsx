import React, { useState, useEffect, useContext } from 'react';
import './ProfileContent.scss';
import Stats from '../Stats/Stats';
import { UserContext } from '../../Context/UserContext';
import SavedPlaylists from '../SavedPlaylists/SavedPlaylists';
import axios from 'axios';

function ProfileContent({ header }) {
  const user = useContext(UserContext);

  const [allTimeArtists, setAllTimeArtists] = useState([]);
  const [allTimeTracks, setAllTimeTracks] = useState([]);

  const topDataAllTime = async () => {
    const query = 'long_term';
    const topArtistID = [];

    try {
      await axios
        .post(
          `http://localhost:8080/artists`,
          {
            query: query,
          },
          { withCredentials: true }
        )
        .then((res) => {
          let topThree = res.data.items.slice(0, 3);
          topThree.forEach((artist) => {
            topArtistID.push(artist.id);
          });
          localStorage.setItem('top artists', JSON.stringify(topArtistID));
          user.setTopArtists(topArtistID);
          setAllTimeArtists(res.data.items);
        });

      await axios
        .post(
          `http://localhost:8080/tracks`,
          {
            query: query,
          },
          { withCredentials: true }
        )
        .then((res) => {
          setAllTimeTracks(res.data.items);
        });
    } catch {
      (err) => {
        if (err.response) {
          console.log(err.response);
          console.log(err.response.status);
        }
      };
    }
  };

  useEffect(() => {
    topDataAllTime();
  }, []);

  const contentSection =
    header === 'Playlists' ? (
      <SavedPlaylists />
    ) : (
      <Stats allTimeArtists={allTimeArtists} allTimeTracks={allTimeTracks} />
    );

  return (
    <div className="profile-content">
      <h1 className="profile-content__header">{header.toUpperCase()}</h1>
      <section className="profile-content__content-section">
        {contentSection}
      </section>
    </div>
  );
}

export default ProfileContent;
