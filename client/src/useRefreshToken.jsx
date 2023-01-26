import { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./Context/UserContext";

const grabNewAccessToken = (user) => {
  const response = axios
    .get("http://localhost:8080/refresh", { withCredentials: true })
    .then((res) => {
      console.log(res);
      user.setProfileData(res.data);
      localStorage.setItem("user profile", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const grabProfile = (user) => {
  //axios call here
  const response = axios
    .get("http://localhost:8080/auth/profile", {
      withCredentials: true,
    })
    .then((res) => {
      user.setProfileData(res.data);
      localStorage.setItem("user profile", JSON.stringify(res.data));
      top3ArtistsAllTime(res.data.access_token, user);
      console.log(res.data);

      // after grabbing profile for the first time, run this function every hour
      setInterval(() => {
        grabNewAccessToken(user);
      }, res.data.expiry * 1000);
    })
    .catch((err) => {
      console.log("this is the error", err);
      return;
    });
};

const useRefreshToken = () => {
  const user = useContext(UserContext);
  useEffect(() => {
    // if (window.location.href !== 'http://localhost:5173/landing') {
    grabProfile(user);
    // }
  }, []);
};

export default useRefreshToken;
