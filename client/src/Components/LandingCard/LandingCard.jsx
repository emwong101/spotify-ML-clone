import React from "react";
import "./LandingCard.scss";

function LandingCard({ banner, content, step }) {
  return (
    <div className="landing__card">
      <img className="landing__card--banner" src={banner} />
      <div className="landing__card--text">
        <h5 className="landing__card--title">{step}</h5>
        <p className="landing__card--body">{content}</p>
      </div>
    </div>
  );
}

export default LandingCard;
