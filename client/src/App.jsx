import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.scss';
import Header from './Components/Header/Header';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'vite/modulepreload-polyfill';

import Profile from './Pages/Profile/Profile';
import Discover from './Pages/Discover/Discover';
import Charts from './Pages/Charts/Charts';
import About from './Pages/About/About';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Navigate to="/discover" />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
