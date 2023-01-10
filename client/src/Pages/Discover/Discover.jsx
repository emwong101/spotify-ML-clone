import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';

function Discover() {
  const user = useContext(UserContext);
  const searchSpotify = async () => {
    console.log('search spotify clicked');
    const url = 'https://api.spotify.com/v1/search';
    const searchQuery = 'anderson paak';
    const typeQuery = `type=artist`;
    const { data } = await axios.get(`${url}?q=${searchQuery}&${typeQuery}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
  };

  return (
    <div className="page--discover">
      <h1>Discover Playlists</h1>
      <section className="discover__form">
        {/*
         * <h2>Form</h2>
         * <a href="http://localhost:8080/auth/spotify">
         *   <button>Login</button>
         * </a>
         */}
        <form action="">
          <label htmlFor="mood">
            <h3>Mood</h3>
            insert moods here
          </label>
          <label htmlFor="timeframe">insert timeframes here</label>
          <button onClick={searchSpotify}>Discover</button>
        </form>
      </section>
      <section className="discover__results">
        <h2>Results</h2>
      </section>
      <div>
        {user.auth ? (
          <div>
            <div>{user.profile.spotify_id}</div>
            <div>
              <a href="http://localhost:8080/auth/logout">
                <button>Logout</button>
              </a>
            </div>
          </div>
        ) : (
          <div>
            <a href="http://localhost:8080/auth/spotify">
              <button>Login</button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Discover;
