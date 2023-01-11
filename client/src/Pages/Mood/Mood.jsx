import React from 'react';
import './Mood.scss';

import MoodButton from '../../Components/MoodButton/MoodButton';

function Mood(props) {
  return (
    <div className="mood">
      <h1 className="mood__header">What's your mood?</h1>
      <section className="mood__selection-list">
        <MoodButton />
        <MoodButton />
        <MoodButton />
        <MoodButton />
        <MoodButton />
        <MoodButton />
        <MoodButton />
      </section>
    </div>
  );
}

export default Mood;
