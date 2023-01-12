import React from 'react';
import './ProfileContent.scss';
import Stats from '../Stats/Stats';

function ProfileContent({ header }) {
  const contentSection =
    header === 'Playlists' ? <h1>playlists content</h1> : <Stats />;
  return (
    <div className="profile-content">
      <h1 className="profile-content__header">{header.toUpperCase()}</h1>
      <section className="profile-content__content-section">
        {contentSection}
      </section>
    </div>
  );
}

export default ProfileContent;
