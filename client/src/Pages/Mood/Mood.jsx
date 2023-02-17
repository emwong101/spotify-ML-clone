import React from 'react';
import './Mood.scss';

import MoodInputs from '../../Components/MoodButton/MoodInputs';
import { Link } from 'react-router-dom';
import Happy from '/assets/happy.png';
import Sad from '/assets/sad.png';
import Chill from '/assets/chill.png';
import Focus from '/assets/focus.png';
import Instrumental from '/assets/instrumental.png';
import Workout from '/assets/workout.png';
import Random from '/assets/random.png';

function Mood() {
  return (
    <div className="mood">
      <h1 className="mood__header">What's your mood?</h1>
      <section className="mood__selection-list">
        <MoodInputs type="happy" src={Happy} />
        <MoodInputs type="sad" src={Sad} />
        <MoodInputs type="focus" src={Focus} />
        <MoodInputs type="chill" src={Chill} />
        <MoodInputs type="instrumental" src={Instrumental} />
        <MoodInputs type="workout" src={Workout} />
        <MoodInputs type="random" src={Random} />
      </section>
    </div>
  );
}

export default Mood;
