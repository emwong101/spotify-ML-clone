import React, { useState, useEffect } from "react";
import "./Mood.scss";

import MoodInputs from "../../components/MoodButton/MoodInputs";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

function Mood() {
  const user = useContext(UserContext);

  useEffect(() => {
    console.log(user.mood);
  }, [user.mood]);
  return (
    <div className="mood">
      <h1 className="mood__header">What's your mood?</h1>
      <Link to="/length">
        <button>Next</button>
      </Link>
      <section className="mood__selection-list">
        <MoodInputs type="happy" />
        <MoodInputs type="sad" />
        <MoodInputs type="focus" />
        <MoodInputs type="chill" />
        <MoodInputs type="instrumental" />
        <MoodInputs type="workout" />
        <MoodInputs type="random" />
      </section>
    </div>
  );
}

export default Mood;
