import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import "./PlaylistLength.scss";
import axios from "axios";
import Slider from "@mui/material/Slider";

function PlaylistLength() {
  const [length, setLength] = useState(5);
  const user = useContext(UserContext);
  const navigate = useNavigate();
  // const BASE_URL = 'https://api.spotify.com/v1/';

  const getRecommendations = async (e) => {
    try {
      await axios
        .post(
          `http://localhost:8080/recommendations`,
          {
            length: length,
            artists: user.artists.join(","),
            mood: user.mood,
          },
          { withCredentials: true }
        )
        .then((res) => {
          user.setRecommendedData(res.data.tracks);
          navigate("/playlistgen");
        });
    } catch (err) {
      console.log(`Error`, err);
    }
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
