import React, { createContext, useState, useEffect } from 'react';
import './PlaylistLength.scss';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';

function PlaylistLength() {
  const user = useContext(UserContext);
  const BASE_URL = 'https://api.spotify.com/v1/';

  const getRecommendations = async () => {
    const { data } = await axios.get(
      `${BASE_URL}recommendations?limit=5&seed_artists=${user.artists.join(
        ','
      )}&${user.mood}`,
      {
        headers: { Authorization: `Bearer ${user.profile.access_token}` },
      }
    );

    console.log(data);
  };

  return (
    <div>
      <h1>Select Length of Playlist</h1>
      <button
        onClick={(e) => {
          getRecommendations();
        }}
      >
        DONE
      </button>
    </div>
  );
}

export default PlaylistLength;
