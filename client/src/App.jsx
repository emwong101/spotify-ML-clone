import { useState, useContext } from "react";
import "./App.scss";
import Header from "./Components/Header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "vite/modulepreload-polyfill";

import UserProvider from "./Context/UserContext";
import Discover from "./Pages/Discover/Discover";
import Charts from "./Pages/Charts/Charts";

import Landing from "./Pages/Landing/Landing";
import Profile from "./Pages/Profile/Profile";
import Mood from "./Pages/Mood/Mood";
import Playlistgen from "./Pages/Playlistgen/Playlistgen";

import { UserContext } from "./Context/UserContext";
import PlaylistLength from "./Pages/playlistLength/PlaylistLength";

function App() {
  // const { isLoggedIn } = useContext(UserContext);

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
