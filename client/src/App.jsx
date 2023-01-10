import { useState, useContext } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "vite/modulepreload-polyfill";

import UserProvider from "./Context/UserContext";
import Discover from "./Pages/Discover/Discover";
import Charts from "./Pages/Charts/Charts";
import About from "./Pages/About/About";
import Landing from "./Pages/Landing/Landing";

import { UserContext } from "./Context/UserContext";

function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Navigate to="/discover" />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/about" element={<About />} />
              <Route path="/landing" element={<Landing />} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
