import React, { useState, useEffect } from "react";
import axios from "axios";

function Discover() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const TOKEN = import.meta.env.VITE_TOKEN;

  const authConfig = `Bearer ${TOKEN}`;
  console.log(authConfig);

  const searchSpotify = async (e) => {
    try {
      const searchQuery = "anderson paak";
      const typeQuery = `type=artist`;
      const { data } = await axios.get(
        `${BASE_URL}search?q=${searchQuery}&${typeQuery}`,
        {
          headers: {
            Authorization: authConfig,
          },
        }
      );
      console.log(data);
      console.log("search spotify clicked");
    } catch {
      console.log("Error");
    }
  };

  return (
    <div className="page--discover">
      <h1>Discover Playlists</h1>
      <section className="discover__form">
        <h2>Form</h2>
        {/* <form action=""> */}
        <label htmlFor="mood">
          <h3>Mood</h3>
          insert moods here
        </label>
        <label htmlFor="timeframe">insert timeframes here</label>
        <button onClick={searchSpotify}>Discover</button>
        {/* </form> */}
      </section>
      <section className="discover__results">
        <h2>Results</h2>
      </section>
    </div>
  );
}

export default Discover;
