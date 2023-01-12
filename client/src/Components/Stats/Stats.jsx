import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

import './Stats.scss';

function Stats(props) {
  const user = useContext(UserContext);
  const [genreStats, setGenreStats] = useState({});
  const [fourWeeksArtists, setFourWeeksArtists] = useState([]);
  const [sixMonthsArtists, setSixMonthsArtists] = useState([]);
  const [allTimeArtists, setAllTimeArtists] = useState([]);

  const getGenreStats = (artistList) => {
    //define an object
    const genres = {};
    //each genre is a key
    //number of occurrences of each genre is a value

    artistList.forEach((artist) => {
      artist.genres.forEach((genre) => {
        //if the genre does not exist in our object, add this in as a key with the value of one since its our first occurrences
        if (!Object.keys(genres).includes(genre)) {
          genres[genre] = 1;
        } else {
          genres[genre] += 1;
        }
      });
    });

    setGenreStats(genres);
  };

  const url = 'https://api.spotify.com/v1/me/top/artists';

  const topArtistsFourWeeks = async () => {
    const query = 'short_term';

    const { data } = await axios
      .get(`${url}?time_range=${query}`, {
        headers: {
          Authorization: `Bearer ${user.profile.access_token}`,
        },
      })
      .catch((err) => {
        if (err.response.status === 401) {
          // make a call to the backend to get new access token
        }
      });

    setFourWeeksArtists(data.items);
  };

  const topArtistsSixMonths = async () => {
    const query = 'medium_term';

    const { data } = await axios.get(`${url}?time_range=${query}`, {
      headers: {
        Authorization: `Bearer ${user.profile.access_token}`,
      },
    });

    setSixMonthsArtists(data.items);
  };

  const topArtistsAllTime = async () => {
    const query = 'long_term';

    const { data } = await axios.get(`${url}?time_range=${query}`, {
      headers: {
        Authorization: `Bearer ${user.profile.access_token}`,
      },
    });

    setAllTimeArtists(data.items);
  };

  const genrePieChart = (
    <Pie
      datasetIdKey="id"
      data={{
        labels: Object.keys(genreStats),
        datasets: [
          {
            label: 'My Genres',
            data: Object.values(genreStats),
            backgroundColor: Object.values(genreStats).map(
              (data) =>
                `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
                  Math.random() * 255
                )}, ${Math.floor(Math.random() * 255)})`
            ),
            hoverOffset: 4,
          },
        ],
      }}
    />
  );

  //grab all data on component mount
  useEffect(() => {
    topArtistsFourWeeks();
    topArtistsSixMonths();
    topArtistsAllTime();
  }, []);

  useEffect(() => {
    //initial stats should show 4weeks top artists when component mounts
    getGenreStats(fourWeeksArtists);
  }, [fourWeeksArtists]);
  return (
    <div className="stats">
      <div>
        <button
          onClick={() => {
            getGenreStats(fourWeeksArtists);
          }}
        >
          Last 4 Weeks
        </button>
        <button
          onClick={() => {
            getGenreStats(sixMonthsArtists);
          }}
        >
          6 Months
        </button>
        <button
          onClick={() => {
            getGenreStats(allTimeArtists);
          }}
        >
          All time
        </button>
      </div>
      {genrePieChart}
    </div>
  );
}

export default Stats;
