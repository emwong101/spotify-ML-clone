import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const UserContext = createContext({
  profile: {},
  setProfileData: () => {},
});

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(sessionStorage.getItem('user profile')) || {};
  });
  // const [profileLocalStorage, setProfileLocalStorage] =
  const [recommended, setRecommended] = useState(() => {
    return JSON.parse(localStorage.getItem('recommended playlist')) || {};
  });

  const [savedplaylists, setSavedplaylists] = useState(() => {
    return JSON.parse(localStorage.getItem('saved playlists')) || {};
  });

  const [topArtists, setTopArtists] = useState(() => {
    return localStorage.getItem('top artists') || [];
  });

  const [mood, setMood] = useState(() => {
    return localStorage.getItem('mood');
  });

  const setProfileData = (profileData) => {
    setIsLoggedIn(profileData);
  };

  const setSavedplaylistsData = (savedplaylistData) => {
    setSavedplaylists(savedplaylistData);
  };

  const setRecommendedData = (data) => {
    setRecommended(data);
  };

  const contextValue = {
    setProfileData,
    setRecommended,
    setSavedplaylistsData,
    setRecommendedData,
    setTopArtists,
    setMood,
    mood: mood,
    profile: isLoggedIn,
    artists: topArtists,
    recommended: recommended,
    savedplaylists: savedplaylists,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
