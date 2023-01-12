import React from 'react';
import './ProfileContent.scss';

function ProfileContent({ header }) {
  return (
    <div className="profile-content">
      <h1 className="profile-content__header">{header.toUpperCase()}</h1>
      <section className="profile-content__content-section">
        <h2>Playlist and stats content goes here</h2>
      </section>
    </div>
  );
}

export default ProfileContent;
