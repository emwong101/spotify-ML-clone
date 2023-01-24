import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import "./PlaylistLength.scss";
import axios from "axios";
import Slider from "@mui/material/Slider";

function PlaylistLength() {
  const [length, setLength] = useState(5);
  const user = useContext(UserContext);
  // const BASE_URL = 'https://api.spotify.com/v1/';

  const getRecommendations = async (e) => {
    try {
      await axios
        .post(
          `http://localhost:8080/recommendations`,
          {
            length: "5",
            artists: "1U1el3k54VvEUzo3ybLPlM",
            mood: "",
          },
          { withCredentials: true },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => console.log(res));

      // let response = await axios
      //   .get(`http://localhost:8080/test`, {
      //     withCredentials: true,
      //   })
      //   .then((res) => console.log(res));
    } catch {
      console.log(`Error`);
    }
    // console.log(user.mood);
  };
}
