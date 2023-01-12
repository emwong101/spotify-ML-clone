import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";

function Charts() {
  const user = useContext(UserContext);
  const [profileData, setProfileData] = useState(null);
  const [fourWeeksArtists, setFourWeeksArtists] = useState([]);
  const artistArray = [];
  //grab new access token in one hour and call grabProfile function again

  const grabProfile = async () => {
    //axios call here
    const response = await axios.get("http://localhost:8080/auth/profile", {
      withCredentials: true,
    });

    user.setProfileData(response.data);
  };

  const url = "https://api.spotify.com/v1/me/top/artists";

  const getTotalGenres = (artistList) => {
    const genres = [];

    artistList.forEach((artist) => {
      artist.genres.forEach((genre) => {
        if (!genres.includes(genre)) {
          genres.push(genre);
        }
      });
    });

    return genres;
  };

  const getGenreStats = (artistList) => {
    //define an object
    const genres = {};
    //each genre is a key
    //number of occurances of each genre is a value

    artistList.forEach((artist) => {
      artist.genres.forEach((genre) => {
        //if the genre does not exist in our object, add this in as a key with the value of one since its our first occurance
        if (!Object.keys(genres).includes(genre)) {
          genres[genre] = 1;
        } else {
          genres[genre] += 1;
        }
      });
    });

    return genres;
  };

  const topArtistsFourWeeks = async () => {
    const query = "short_term";

    const { data } = await axios
      .get(`${url}?time_range=${query}&limit=5`, {
        headers: {
          Authorization: `Bearer ${user.profile.access_token}`,
        },
      })
      .catch((err) => {
        if (err.response.status === 401) {
          // make a call to the backend to get new access token
        }
      });

    console.log(data);
    data.items.forEach((artist) => {
      artistArray.push(artist.id);
      user.setTopArtists(artistArray);
    });

    const genres = getTotalGenres(data.items);

    const obj = getGenreStats(data.items);

    console.log(obj);
  };

  const topArtistsSixMonths = async () => {
    const query = "medium_term";

    const { data } = await axios.get(`${url}?time_range=${query}`, {
      headers: {
        Authorization: `Bearer ${user.profile.access_token}`,
      },
    });

    console.log(data);
    data.items.forEach((artist) => {
      console.log(artist.name);
    });
  };

  const topArtistsAllTime = async () => {
    const query = "long_term";

    const { data } = await axios.get(`${url}?time_range=${query}`, {
      headers: {
        Authorization: `Bearer ${user.profile.access_token}`,
      },
    });

    console.log(data);
    data.items.forEach((artist) => {
      console.log(artist.name);
    });
  };

  useEffect(() => {
    grabProfile();
  }, []);

  return (
    <>
      <div
        className="page--charts"
        onClick={() => {
          console.log(user);
        }}
      >
        <h1>Charts</h1>
        <h4>Viewing your data</h4>
        {user.auth ? (
          <div>
            <h1>Profile Data</h1>
            <p>{user.profile.first_name}</p>
            <p>{user.profile.last_name}</p>
            <p>{user.profile.email}</p>
            <p>{user.profile.spotify_id}</p>
            <a href="http://localhost:8080/auth/logout">
              <button>Log Out</button>
            </a>
          </div>
        ) : (
          <>
            <p>
              <strong>This page requires authentication.</strong>
            </p>
            <a href="http://localhost:8080/auth/spotify">
              <button>Login</button>
            </a>
          </>
        )}
        <section>
          <p>Selectors</p>
          <div>
            <button onClick={topArtistsFourWeeks}>Last 4 Weeks</button>
            <button onClick={topArtistsSixMonths}>6 Months</button>
            <button onClick={topArtistsAllTime}>All time</button>
          </div>
        </section>
        <section>
          <h2>Top Artists</h2>
          <div></div>
          <div>
            <p>charts go here</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Charts;
