import React from "react";

function MoodInputs({ moodSelection, type }) {
  const moods = {
    happy: "min_danceability=0.55&min_energy=0.6&min_tempo=76&min_valence=0.6",
    sad: "max_danceability=0.5&max_energy=0.7&max_valence=0.55",
    focus: "min_acousticness=0.7&min_instrumentalness=0.85&max_speechiness=0.2",
    chill:
      "min_acousticness=0.45&max_danceability=0.4&max_energy=0.3&max_speechiness=0.3",
    instrumental:
      "min_acousticness=0.65&max_energy=0.25&min_instrumentalness=0.75&max_speechiness=0.05",
    workout: "min_danceability=0.75&min_energy=0.8&min_tempo=115",
    random: "",
  };

  return (
    <div>
      <input
        type="radio"
        name="mood"
        id={type}
        value={moods[type]}
        onClick={moodSelection}
      />
    </div>
  );
}

export default MoodInputs;
