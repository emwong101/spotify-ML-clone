import { useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './Context/UserContext';

const grabNewAccessToken = (user) => {
  const response = axios
    .get('http://localhost:8080/refresh', { withCredentials: true })
    .then((res) => {
      console.log(res);
      user.setProfileData(res.data);
      localStorage.setItem('user profile', JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const grabProfile = (user) => {
  //axios call here
  const response = axios
    .get('http://localhost:8080/auth/profile', {
      withCredentials: true,
    })
    .then((res) => {
      user.setProfileData(res.data);
      localStorage.setItem('user profile', JSON.stringify(res.data));
      top3ArtistsAllTime(res.data.access_token, user);
      console.log(res.data);

      //after grabbing profile for the first time, run this function every hour
      setInterval(() => {
        grabNewAccessToken(user);
      }, res.data.expiry * 1000);
    });
};

const url = 'https://api.spotify.com/v1/me/top/artists';

const top3ArtistsAllTime = async (access_token, user) => {
  const query = 'long_term';
  const topArtistID = [];

  const { data } = await axios.get(`${url}?time_range=${query}&limit=3`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  data.items.forEach((artist) => {
    topArtistID.push(artist.id);
  });

  localStorage.setItem('top artists', JSON.stringify(topArtistID));
  user.setTopArtists(topArtistID);
};

const useRefreshToken = () => {
  const user = useContext(UserContext);
  useEffect(() => {
    if (window.location.href !== 'http://localhost:5173/landing') {
      grabProfile(user);
    }
  }, []);
};

export default useRefreshToken;
