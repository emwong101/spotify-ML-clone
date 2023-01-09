import React, { useState, useEffect } from "react";
import axios from "axios";
import MoodInputs from "../../components/moodInputs/MoodInputs";

function Discover() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const TOKEN = import.meta.env.VITE_TOKEN;

  const authConfig = `Bearer ${TOKEN}`;

  const [mood, setMood] = useState();

  const submit = (e) => {
    e.preventDefault();
    console.log(e.target.mood.value);
  };

  const moodSelection = (e) => {
    setMood(e.target.value);
  };

  const getRecommendations = async (e) => {
    // try {
    //   const { data } = await axios.get(
    //     `${BASE_URL}recommendations?limit=5&seed_artists=6aaMZ3fcfLv4tEbmY7bjRM&${mood}`,
    //     {
    //       headers: { Authorization: authConfig },
    //     }
    //   );
    //   console.log(data);
    //   console.log(e.target);
    // } catch {
    //   console.log("Error");
    // }
    console.log(mood);
  };

  return (
    <div className="page--discover">
      <h1>Discover Playlists</h1>
      <section className="discover__form">
        <h2>Form</h2>
        <form id="discover" action="" onSubmit={submit}>
          <label htmlFor="discover">
            <h3>Mood</h3>
            <MoodInputs
              moodSelection={moodSelection}
              type="happy"
              mood={mood}
            />
            <MoodInputs moodSelection={moodSelection} type="sad" mood={mood} />
            <MoodInputs
              moodSelection={moodSelection}
              type="focus"
              mood={mood}
            />
            <MoodInputs
              moodSelection={moodSelection}
              type="chill"
              mood={mood}
            />
            <MoodInputs
              moodSelection={moodSelection}
              type="instrumental"
              mood={mood}
            />
            <MoodInputs
              moodSelection={moodSelection}
              type="workout"
              mood={mood}
            />
            <MoodInputs
              moodSelection={moodSelection}
              type="random"
              mood={mood}
            />
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
