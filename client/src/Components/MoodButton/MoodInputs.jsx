import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import "./MoodInputs.scss";

function MoodInputs({ type }) {
  const user = useContext(UserContext);

  const moods = {
    happy:
      "seed_genres=happy&min_danceability=0.55&min_energy=0.6&min_tempo=76&min_valence=0.6",
    sad: "seed_genres=sad&max_danceability=0.5&max_energy=0.7&max_valence=0.55",
    focus: "seed_genres=study&min_instrumentalness=0.65&max_speechiness=0.1",
    chill:
      "seed_genres=chill&min_acousticness=0.45&max_danceability=0.4&max_energy=0.3&max_speechiness=0.3",
    instrumental:
      "seed_genres=classical%2C%20lo-fi&min_instrumentalness=0.8&max_speechiness=0.1",
    workout:
      "seed_genres=work-out&min_danceability=0.75&min_energy=0.8&min_tempo=115",
    random: "",
  };

  const moodSelection = (e) => {
    localStorage.setItem("mood", e.target.value);
    user.setMood(e.target.value);
  };

  return (
    <div>
      <input
        className="moodRadio"
        type="radio"
        name="mood"
        id={type}
        value={moods[type]}
        onClick={moodSelection}
      />
      <label className="mood-label" htmlFor={type}>
        {type}
      </label>
    </div>
  );
}

export default MoodInputs;
