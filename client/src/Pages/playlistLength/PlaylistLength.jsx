import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import "./PlaylistLength.scss";
import axios from "axios";
import Slider from "@mui/material/Slider";

function PlaylistLength() {
  const [length, setLength] = useState(5);
  const user = useContext(UserContext);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // const BASE_URL = 'https://api.spotify.com/v1/';

  const getRecommendations = async (e) => {
    try {
      await axios.post(
        `http://localhost:8080/recommendations`,
        {
          length: "5",
          artists: "1U1el3k54VvEUzo3ybLPlM",
          mood: "",
        },
        {
          headers: { withCredentials: true },
        }
      );
    } catch {
      console.log(`Error`);
    }
    console.log(user.mood);
  };

  console.log(user);

  return (
    <div>
      <div className="playlist-length__slider">
        <Slider
          min={5}
          max={100}
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
          }}
          defaultValue={5}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
        <p>Playlist Length: {length}</p>
      </div>

      <button onClick={getRecommendations}>DONE</button>
    </div>
  );
}

export default PlaylistLength;
