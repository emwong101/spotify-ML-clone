import React, { useState, useEffect } from "react";
import axios from "axios";

function Discover() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const TOKEN = import.meta.env.VITE_TOKEN;

  const authConfig = `Bearer ${TOKEN}`;
  console.log(authConfig);

  const [mood, setMood] = useState("");

  const moods = {
    happy: "&min_danceability=0.55&min_energy=0.6&min_tempo=76&min_valence=0.6",
    sad: "&max_danceability=0.5&max_energy=0.7&max_valence=0.55",
    focus: "",
    chill: "",
    instrumental: "",
    workout: "",
    random: "",
  };

  const submit = (e) => {
    e.preventDefault();
  };

  const moodSelection = (e) => {
    setMood(e.target.value);
  };

  const getRecommendations = async (e) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}recommendations?limit=5&seed_artists=6aaMZ3fcfLv4tEbmY7bjRM&min_danceability=0.55&min_energy=0.6&min_tempo=76&min_valence=0.6`,
        {
          headers: { Authorization: authConfig },
        }
      );
      console.log(data);
      console.log(e.target);
    } catch {
      console.log("Error");
    }
  };

  return (
    <div className="page--discover">
      <h1>Discover Playlists</h1>
      <section className="discover__form">
        <h2>Form</h2>
        <form id="discover" action="" onSubmit={submit}>
          <label htmlFor="discover">
            <h3>Mood</h3>
            <input type="radio" name="mood" id="happy" />
            <p>ooo</p>
            <input type="radio" name="mood" id="sad" />
            <input type="radio" name="mood" id="focus" />
            <input type="radio" name="mood" id="chill" />
            <input type="radio" name="mood" id="instrumental" />
            <input type="radio" name="mood" id="workout" />
            <input type="radio" name="mood" id="random" />
          </label>
          <label htmlFor="timeframe">insert timeframes here</label>
          <button onClick={getRecommendations}>Discover</button>
        </form>
      </section>
      <section className="discover__results">
        <h2>Results</h2>
      </section>
    </div>
  );
}

export default Discover;
