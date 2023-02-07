import { useState, useContext, useEffect } from "react";
import "./App.scss";
import Header from "./Components/Header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "vite/modulepreload-polyfill";

import Discover from "./Pages/Discover/Discover";
import Charts from "./Pages/Charts/Charts";

import Landing from "./Pages/Landing/Landing";
import Profile from "./Pages/Profile/Profile";
import Mood from "./Pages/Mood/Mood";
import Playlistgen from "./Pages/Playlistgen/Playlistgen";

import PlaylistLength from "./Pages/playlistLength/PlaylistLength";
import axios from "axios";
import { UserContext } from "./Context/UserContext";
import useRefreshToken from "./useRefreshToken";
import LandingGradient from "./Components/LandingGradient/LandingGradient";

function App() {
  //custom hook to grab new access token after an hour
  useRefreshToken();
  const user = useContext(UserContext);

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                user.profile.id ? (
                  <Navigate to="/profile" />
                ) : (
                  <Navigate to="/landing" />
                )
              }
            />
            <Route path="/discover" element={<Discover />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/landing" element={<LandingGradient />} />
            <Route path="/mood" element={<Mood />} />
            <Route path="/playlistgen" element={<Playlistgen />} />
            <Route path="/length" element={<PlaylistLength />} />
            <Route path="/dev" element={<LandingGradient />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
