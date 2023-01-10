import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const UserContext = createContext({
  profile: {},
  auth: false,
  setProfileData: () => {},
});

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState({});

  // const grabProfile = async () => {
  //   //axios call here
  //   const response = await axios.get('http://localhost:8080/auth/profile', {
  //     withCredentials: true,
  //   });
  //   // .then((res) => {
  //   //   // console.log("landing auth: ", res);

  //   //   // if (res.status === 200) {
  //   //   //   let navigate = useNavigate();
  //   //   //   navigate("/charts");
  //   //   //   return;
  //   //   setIsLoggedIn({ data: res.data, auth: true });
  //   //   console.log(res);
  //   //   console.log('function is ran');
  //   // })
  //   // .catch((err) => {
  //   //   if (err.response.status === 401) {
  //   //     // Update the state: done authenticating, user is not logged in
  //   //   } else {
  //   //     console.log('Error authenticating', err);
  //   //   }
  //   // });
  //   setIsLoggedIn({ data: response.data, auth: true });
  //   console.log(isLoggedIn);
  // };

  // const login = () => {
  //   const response = axios
  //     .get('http://localhost:8080/auth/spotify', {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       setIsLoggedIn((user) => ({ data: res.data, auth: true }));
  //     })
  //     .catch((err) => {
  //       if (err.response.status === 401) {
  //         // Update the state: done authenticating, user is not logged in
  //       } else {
  //         console.log('Error Logging in', err);
  //       }
  //     });
  // };

  const setProfileData = (profileData) => {
    setIsLoggedIn({ data: profileData, auth: true });
  };

  const logout = () => {
    const response = axios
      .get('http://localhost:8080/auth/logout', {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoggedIn((user) => ({ data: {}, auth: false }));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          // Update the state: done authenticating, user is not logged in
        } else {
          console.log('Error Logging out', err);
        }
      });
  };

  const contextValue = {
    setProfileData,
    profile: isLoggedIn.data,
    auth: isLoggedIn.auth,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
