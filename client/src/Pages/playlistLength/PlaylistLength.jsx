import React from "react";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import "./PlaylistLength.scss";
import axios from "axios";

function PlaylistLength() {
  const user = useContext(UserContext);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const getRecommendations = async (e) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}recommendations?limit=5&seed_artists=${user.artists.join(
          ","
        )}&${user.mood}`,
        {
          headers: { Authorization: `Bearer ${user.profile.access_token}` },
        }
      );
      console.log(data);
    } catch {
      console.log("Error");
    }
    console.log(user.mood);
  };
  return (
    <div>
      <button onClick={getRecommendations}>DONE</button>
    </div>
  );
}

export default PlaylistLength;
