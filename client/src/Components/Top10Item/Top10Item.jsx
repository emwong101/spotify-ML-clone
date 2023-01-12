import React from 'react';
import './Top10Item.scss';

function Top10Item({ name, track, imgURL, albumURL }) {
  return (
    <div className="top-item">
      <img
        className="top-item__image"
        src={albumURL ? albumURL : imgURL}
        alt="artist thumbnail"
      />
      <div className="top-item__item-desc">
        <p className="top-item__name">{name}</p>
        <p className="top-item__track-name">{track}</p>
      </div>
    </div>
  );
}

export default Top10Item;
