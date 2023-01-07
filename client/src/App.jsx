import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Discover from "./Pages/Discover/Discover";
import Charts from "./Pages/Charts/Charts";
import About from "./Pages/About/About";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/discover" />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
