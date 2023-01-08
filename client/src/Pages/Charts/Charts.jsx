import React, { useState, useEffect } from "react";
import PlaceHolder from "../../assets/Images/Rectangle.png";
import "./Charts.scss";
import axios from "axios";
import { PolarArea, getElementsAtEvent } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function Charts() {
  const loginSpotify = async () => {
    console.log("login was clicked...");
    try {
      const response = await axios.get(`http://localhost:8080/auth/spotify`);
    } catch (err) {
      console.log(err);
    }

    console.log(response);
  };

  const [type, setType] = useState("Artists");
  const [duration, setDuration] = useState("short_term");

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
    } catch (err) {
      console.log(err, "Error");
    }
  };

  const usersTopItems = async (e) => {
    try {
      const { data } = await axios.get(`${BASE_URL}me/top/tracks`, {
        headers: {
          Authorization: authConfig,
        },
      });
      console.log(data);
      console.log("users top items clicked");
    } catch (err) {
      console.log(err);
    }
  };

  const data = {
    labels: [
      "Anderson Paak",
      "Khalid",
      "The Weeknd",
      "Linkin Park",
      "Phil Collins",
    ],
    datasets: [
      {
        label: "Artists",
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };

  const config = {
    type: "polarArea",
    data: data,
    options: {},
  };

  return (
    <div className="page--charts">
      <button onClick={loginSpotify}>Try to log in</button>
      <button onClick={searchSpotify}>Search tests</button>
      <button onClick={usersTopItems}>Search Top Items</button>

      <h1>Charts</h1>
      <h4>Viewing your data</h4>
      <section>
        <p>Duration: {duration}</p>
        <div className="chart__time-selectors">
          <button
            onClick={() => {
              setDuration("short_term");
            }}
          >
            Last 4 Weeks
          </button>
          <button
            onClick={() => {
              setDuration("medium_term");
            }}
          >
            Previous 6 Months
          </button>
          <button
            onClick={() => {
              setDuration("long_term");
            }}
          >
            All time
          </button>
        </div>
      </section>
      <section>
        <h2>Top {type}</h2>
        <div className="chart__type-selectors">
          <button
            onClick={() => {
              setType("Artists");
            }}
          >
            Artists
          </button>
          <button
            onClick={() => {
              setType("Songs");
            }}
          >
            Songs
          </button>
          <button
            onClick={() => {
              setType("Genres");
            }}
          >
            Genres
          </button>
        </div>
        <div className="chart__top-of-type-wrapper">
          <article className="chart__res-image">
            <img src={PlaceHolder} alt="placeholder" />
            <h4>Anderson .Paak</h4>
          </article>
          <article className="chart__res-image">
            <img src={PlaceHolder} alt="placeholder" />
            <h4>Anderson .Paak</h4>
          </article>
          <article className="chart__res-image">
            <img src={PlaceHolder} alt="placeholder" />
            <h4>Anderson .Paak</h4>
          </article>
          <article className="chart__res-image">
            <img src={PlaceHolder} alt="placeholder" />
            <h4>Anderson .Paak</h4>
          </article>
          <article className="chart__res-image">
            <img src={PlaceHolder} alt="placeholder" />
            <h4>Anderson .Paak</h4>
          </article>
        </div>
        <div>
          <p>charts go here</p>
          <PolarArea data={data} config={config} />
        </div>
      </section>
    </div>
  );
}

export default Charts;
