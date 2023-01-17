import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const UserContext = createContext({
  profile: {},
  setProfileData: () => {},
});

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem('user profile')) || {};
  });
  // const [profileLocalStorage, setProfileLocalStorage] =
  const [recommended, setRecommended] = useState(() => {
    return JSON.parse(localStorage.getItem('recommended playlist')) || {};
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

  const setRecommendedData = (recommendedData) => {
    setRecommended(recommendedData);
  };

  const contextValue = {
    setProfileData,
    setRecommendedData,
    setTopArtists,
    setMood,
    mood: mood,
    profile: isLoggedIn,
    artists: topArtists,
    recommended: recommended,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
