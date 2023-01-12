import React, { useState } from "react";
import "./Mood.scss";

import MoodInputs from "../../components/MoodButton/MoodInputs";
import { Link } from "react-router-dom";

function Mood({ selectedMood, setSelectedMood }) {
  const [mood, setMood] = useState();

  const moodSelection = (e) => {
    setMood(e.target.value);
  };
  return (
    <div className="mood">
      <h1 className="mood__header">What's your mood?</h1>
      <Link to="/length">
        <button>Next</button>
      </Link>
      <section className="mood__selection-list">
        <MoodInputs moodSelection={moodSelection} type="happy" mood={mood} />
        <MoodInputs moodSelection={moodSelection} type="sad" mood={mood} />
        <MoodInputs moodSelection={moodSelection} type="focus" mood={mood} />
        <MoodInputs moodSelection={moodSelection} type="chill" mood={mood} />
        <MoodInputs
          moodSelection={moodSelection}
          type="instrumental"
          mood={mood}
        />
        <MoodInputs moodSelection={moodSelection} type="workout" mood={mood} />
        <MoodInputs moodSelection={moodSelection} type="random" mood={mood} />
      </section>
    </div>
  );
}

export default Mood;
