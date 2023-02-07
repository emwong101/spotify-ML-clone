import "./LandingGradient.scss";

import React from "react";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import LandingCard from "../LandingCard/LandingCard";
import Mixtape from "/assets/mixtape-background.svg";
import Login from "/assets/login-background.svg";
import Mood from "/assets/mood-background.svg";

function LandingGradient() {
  const user = useContext(UserContext);
  const mouseTracker = () => {
    const [mousePosition, setMousePosition] = useState({ x: null, y: null });

    useEffect(() => {
      const updateMouse = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener("mousemove", updateMouse);

      return () => {
        window.removeEventListener("mousemove", updateMouse);
      };
    }, []);

    return mousePosition;
  };

  const mousePosition = mouseTracker();
  const positionX = mousePosition.x + "px";
  const positionY = mousePosition.y + "px";
  return (
    <div>
      <div
        className="landing__container"
        style={{ "--x": positionX, "--y": positionY }}
      >
        <h1 className="tagline">
          Build the <span className="mixtape">mixtape</span> of <br />
          your dreams
        </h1>
        <div className="landing__cards">
          <LandingCard
            banner={Login}
            content="Log in with your Spotify account and let us handle the rest, while you Ubereats some drinks"
            step="Step 1: Log in"
          />
          <LandingCard
            banner={Mood}
            content="Your mood is like your alarm clock, you have to set it! Choose the category you're feeling the most and hit submit."
            step="Step 2: Set the Mood"
          />
          <LandingCard
            banner={Mixtape}
            content="Now, chill out, grab a beer, and enjoy your new custom mixtape!"
            step="Step 3: Get Your Mixtape!"
          />
        </div>
        {user.profile.id ? (
          <div className="landing__profile-container">
            <div className="landing__profile">{user.profile.spotify_id}</div>
            <div>
              <a href="http://localhost:8080/auth/logout">
                <button
                  type="button"
                  className="landing__button"
                  onClick={() => {
                    sessionStorage.clear();
                  }}
                >
                  Logout
                </button>
              </a>
            </div>
          </div>
        ) : (
          <div>
            <a href="http://localhost:8080/auth/spotify">
              <button type="button" className="landing__button">
                Login
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingGradient;
