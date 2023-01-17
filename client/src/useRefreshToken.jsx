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

const useRefreshToken = () => {
  const user = useContext(UserContext);
  useEffect(() => {
    if (!user.profile.expiry) {
      return;
    } else {
      setInterval(() => {
        grabNewAccessToken(user);
      }, user.profile.expiry * 1000);
    }
  }, []);
};

export default useRefreshToken;
