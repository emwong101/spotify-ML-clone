import { useState, useContext, useEffect } from 'react';
import './App.scss';
import Header from './Components/Header/Header';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'vite/modulepreload-polyfill';

import UserProvider from './Context/UserContext';
import Discover from './Pages/Discover/Discover';
import Charts from './Pages/Charts/Charts';

import Landing from './Pages/Landing/Landing';
import Profile from './Pages/Profile/Profile';
import Mood from './Pages/Mood/Mood';
import Playlistgen from './Pages/Playlistgen/Playlistgen';

import PlaylistLength from './Pages/playlistLength/PlaylistLength';
import axios from 'axios';
import { UserContext } from './Context/UserContext';

function App() {
  const user = useContext(UserContext);
  const userProfile = JSON.parse(localStorage.getItem('user profile'));

  const grabNewAccessToken = () => {
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

  useEffect(() => {
    setInterval(() => {
      grabNewAccessToken();
    }, userProfile.expiry * 1000);
  }, []);

  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Navigate to="/landing" />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/charts" element={<Charts />} />

              <Route path="/landing" element={<Landing />} />
              <Route path="/mood" element={<Mood />} />
              <Route path="/playlistgen" element={<Playlistgen />} />
              <Route path="/length" element={<PlaylistLength />} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
