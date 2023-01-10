import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext({ data: {}, auth: false });

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState({ data: {}, auth: false });

  const grabProfile = () => {
    //axios call here
    const response = axios
      .get("http://localhost:8080/auth/profile", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log("landing auth: ", res);

        // if (res.status === 200) {
        //   let navigate = useNavigate();
        //   navigate("/charts");
        //   return;
        console.log("landing auth: ", res);
        setIsLoggedIn((user) => ({ data: res.data, auth: true }));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          // Update the state: done authenticating, user is not logged in
        } else {
          console.log("Error authenticating", err);
        }
      });
  };

  const login = () => {
    const response = axios
      .get("http://localhost:8080/auth/spotify", {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoggedIn((user) => ({ data: res.data, auth: true }));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          // Update the state: done authenticating, user is not logged in
        } else {
          console.log("Error Logging in", err);
        }
      });
  };

  const logout = () => {
    const response = axios
      .get("http://localhost:8080/auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoggedIn((user) => ({ data: {}, auth: false }));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          // Update the state: done authenticating, user is not logged in
        } else {
          console.log("Error Logging out", err);
        }
      });
  };

  useEffect(() => {
    grabProfile();
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, grabProfile, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
