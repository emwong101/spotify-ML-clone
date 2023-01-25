import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

import "./Stats.scss";
import Top10Item from "../Top10Item/Top10Item";

function Stats(props) {
  const user = useContext(UserContext);
  const [genreStats, setGenreStats] = useState({});
  const [fourWeeksArtists, setFourWeeksArtists] = useState([]);
  const [fourWeeksTracks, setFourWeeksTracks] = useState([]);
  const [sixMonthsArtists, setSixMonthsArtists] = useState([]);
  const [sixMonthsTracks, setSixMonthsTracks] = useState([]);
  const [allTimeArtists, setAllTimeArtists] = useState([]);
  const [allTimeTracks, setAllTimeTracks] = useState([]);
  const [top10Artists, setTop10Artists] = useState([]);
  const [top10Tracks, setTop10Track] = useState([]);

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

  const getTopArtistStats = (artistList) => {
    const artistsArr = [];

    artistList.forEach((artist) => {
      const artistInfo = {
        artist_name: artist.name,
        artist_image: artist.images[1].url,
      };
      artistsArr.push(artistInfo);
    });

    setTop10Artists(artistsArr);
  };

  const getTopTrackStats = (trackList) => {
    const tracksArr = [];

    trackList.forEach((track) => {
      const trackInfo = {
        artist_name: track.artists[0].name,
        track_name: track.name,
        album_image: track.album.images[1].url,
      };
      tracksArr.push(trackInfo);
    });

    setTop10Track(tracksArr);
  };

  const url = "https://api.spotify.com/v1/me/top/artists";
  const tracksUrl = "https://api.spotify.com/v1/me/top/tracks";

  const topDataFourWeeks = async () => {
    const query = "short_term";

    const { data } = await axios
      .get(`${url}?time_range=${query}&limit=10`, {
        headers: {
          Authorization: `Bearer ${user.profile.access_token}`,
        },
      })
      .catch((err) => {
        if (err.response.status === 401) {
          // make a call to the backend to get new access token
        }
      });

    const tracks = await axios
      .get(`${tracksUrl}?time_range=${query}&limit=10`, {
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
    setFourWeeksTracks(tracks.data.items);
  };

  const topDataSixMonths = async () => {
    const query = "medium_term";

    const { data } = await axios.get(`${url}?time_range=${query}&limit=10`, {
      headers: {
        Authorization: `Bearer ${user.profile.access_token}`,
      },
    });

    const tracks = await axios
      .get(`${tracksUrl}?time_range=${query}&limit=10`, {
        headers: {
          Authorization: `Bearer ${user.profile.access_token}`,
        },
      })
      .catch((err) => {
        if (err.response.status === 401) {
          // make a call to the backend to get new access token
        }
      });

    setSixMonthsArtists(data.items);
    setSixMonthsTracks(tracks.data.items);
  };

  const topDataAllTime = async () => {
    const query = "long_term";
    const topArtistID = [];

    const { data } = await axios.get(`${url}?time_range=${query}&limit=10`, {
      headers: {
        Authorization: `Bearer ${user.profile.access_token}`,
      },
    });

    const tracks = await axios
      .get(`${tracksUrl}?time_range=${query}&limit=10`, {
        headers: {
          Authorization: `Bearer ${user.profile.access_token}`,
        },
      })
      .catch((err) => {
        if (err.response.status === 401) {
          // make a call to the backend to get new access token
        }
      });

    setAllTimeArtists(data.items);
    setAllTimeTracks(tracks.data.items);
  };

  const genrePieChart = (
    <Pie
      datasetIdKey="id"
      data={{
        labels: Object.keys(genreStats),
        datasets: [
          {
            label: "My Genres",
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
    topDataFourWeeks();
    topDataSixMonths();
    topDataAllTime();
  }, []);

  useEffect(() => {
    //initial stats should show 4weeks top artists and tracks after component mounts
    getGenreStats(fourWeeksArtists);
    getTopArtistStats(fourWeeksArtists);
    getTopTrackStats(fourWeeksTracks);
  }, [fourWeeksArtists]);

  const top10ArtistsList = top10Artists.map((artist) => (
    <Top10Item
      key={artist.artist_name}
      name={artist.artist_name}
      imgURL={artist.artist_image}
    />
  ));

  const top10TrackList = top10Tracks.map((track) => (
    <Top10Item
      key={track.track_name}
      name={track.artist_name}
      track={track.track_name}
      albumURL={track.album_image}
    />
  ));
  return (
    <div className="stats">
      <div className="stats__menu-buttons">
        <button
          onClick={() => {
            getGenreStats(fourWeeksArtists);
            getTopArtistStats(fourWeeksArtists);
            getTopTrackStats(fourWeeksTracks);
          }}
        >
          Last 4 Weeks
        </button>
        <button
          onClick={() => {
            getGenreStats(sixMonthsArtists);
            getTopArtistStats(sixMonthsArtists);
            getTopTrackStats(sixMonthsTracks);
          }}
        >
          6 Months
        </button>
        <button
          onClick={() => {
            getGenreStats(allTimeArtists);
            getTopArtistStats(allTimeArtists);
            getTopTrackStats(allTimeTracks);
          }}
        >
          All time
        </button>
      </div>

      {genrePieChart}

      <section className="stats__top-artists">
        <h3>Top 10 Artists</h3>
        <div className="stats__top-artists-list">{top10ArtistsList}</div>
      </section>

      <section className="stats__top-songs">
        <h3>Top 10 Songs</h3>
        <div className="stats__top-artists-list">{top10TrackList}</div>
      </section>
    </div>
  );
}

export default Stats;
