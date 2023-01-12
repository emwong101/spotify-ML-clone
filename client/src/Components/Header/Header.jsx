import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./Header.scss";

function Header() {
  return (
    <header className="header">
      This is the freakin header
      <nav className="nav--header">
        <ul>
          <li>
            <Link to="/discover">Discover</Link>
          </li>
          <li>
            <Link to="/charts">Charts</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/landing">Landing</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/playlistgen">Playlist Gen</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
