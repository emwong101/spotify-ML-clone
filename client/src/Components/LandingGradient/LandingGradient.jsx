import "./LandingGradient.scss";

import React from "react";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import Mixtape from "/assets/mixtape-background.svg";

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
        className="main__container"
        style={{ "--x": positionX, "--y": positionY }}
      >
        <h1 className="tagline">
          Build the <span className="mixtape">mixtape</span> of <br />
          your dreams
        </h1>
        <div className="landing__card">
          <img className="landing__card--banner" src={Mixtape} />
          <div className="landing__card--text">
            <h5 className="landing__card--title">Step 3: Get Your Mixtape!</h5>
            <p className="landing__card--body">text goes here</p>
          </div>
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
