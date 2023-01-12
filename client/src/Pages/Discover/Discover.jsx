import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import MoodInputs from "../../components/MoodButton/MoodInputs";
import { Link } from "react-router-dom";
import PlaylistLength from "../playlistLength/PlaylistLength";

function Discover() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const TOKEN = import.meta.env.VITE_TOKEN;
  const user = useContext(UserContext);
  const authConfig = `Bearer ${TOKEN}`;

  const [mood, setMood] = useState();
  const [length, setLength] = useState();
  const [clickedStart, setClickedStart] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    console.log(e.target.mood.value);
  };

  const moodSelection = (e) => {
    setMood(e.target.value);
  };

  const getRecommendations = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${BASE_URL}recommendations?limit=5&seed_artists=${user.artists.join(
          ","
        )}&${mood}`,
        {
          headers: { Authorization: authConfig },
        }
      );
      console.log(data);
    } catch {
      console.log("Error");
    }
    console.log(mood);
  };

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
      {!clickedStart && (
        <section className="discover__form">
          <input
            type="button"
            value="Start"
            onClick={() => {
              setClickedStart(true);
            }}
          />
        </section>
      )}
      <form action="" onSubmit={getRecommendations}>
        {clickedStart && (
          <section className="mood__selection-list">
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
          </section>
        )}
        {/* {mood && <PlaylistLength />} */}
        <input type="submit" />
      </form>
    </div>
  );
}

export default Discover;
