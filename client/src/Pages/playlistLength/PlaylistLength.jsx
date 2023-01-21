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
  // const BASE_URL = import.meta.env.VITE_BASE_URL;
  const BASE_URL = "https://api.spotify.com/v1/";
  let navigate = useNavigate();

  const testendpoint = async () => {
    let { data } = await axios.post(
      "http://localhost:8080/testendpoint",
      { plname: "posttestpl" },
      {
        withCredentials: true,
      }
    );
    console.log("post testendpoint", data);
  };

  const getRecommendations = async (e) => {
    try {
      console.log("getRecommendations", user.profile.access_token);
      console.log("user artist", user.artists);
      const { data } = await axios.get(
        `${BASE_URL}recommendations?limit=${length}&seed_artists=${user.artists.join(
          ","
        )}&${user.mood}`,
        {
          headers: {
            Authorization: `Bearer ${user.profile.access_token}`,
          },
        }
      );
      console.log(data);
      localStorage.setItem("recommended playlist", JSON.stringify(data));
      user.setRecommendedData(data);
    } catch {
      console.log("Error");
    }
    navigate("/playlistgen");
  };

  useEffect(() => {
    console.log(user);
  }, []);

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

      <button onClick={() => getRecommendations()}>DONE</button>
      <button onClick={() => testendpoint()}>testendpoint</button>
    </div>
  );
}

export default PlaylistLength;
