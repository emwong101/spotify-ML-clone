import "./LandingGradient.scss";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function LandingGradient() {
  const tracker = useRef();
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
        ref={tracker}
        style={{ "--x": positionX, "--y": positionY }}
      >
        <h1 className="tagline">
          Build the mixtape <br />
          of your dreams
        </h1>
      </div>
    </div>
  );
}

export default LandingGradient;
