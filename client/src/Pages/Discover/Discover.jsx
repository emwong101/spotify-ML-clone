import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import MoodInputs from "../../Components/MoodButton/MoodInputs";
import { Link } from "react-router-dom";
import PlaylistLength from "../playlistLength/PlaylistLength";
import Mood from "../Mood/Mood";

function Discover() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const TOKEN = import.meta.env.VITE_TOKEN;
  const user = useContext(UserContext);
  const authConfig = `Bearer ${TOKEN}`;

  return (
    <div className="page--discover">
      <h1>Discover Playlists</h1>
      <section className="discover__form">
        <Link to="/mood">
          <input type="button" value="Start" />
        </Link>
      </section>
    </div>
  );
}

export default Discover;
