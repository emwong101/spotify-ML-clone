import React, { useState, useEffect } from "react";
import axios from "axios";

function Discover() {
  const searchSpotify = async () => {
    console.log("search spotify clicked");
    const url = "https://api.spotify.com/v1/search";
    const searchQuery = "anderson paak";
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
        <h2>Form</h2>
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
    </div>
  );
}

export default Discover;
