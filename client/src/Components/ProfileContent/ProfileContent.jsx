import React from 'react';
import './ProfileContent.scss';
import Stats from '../Stats/Stats';
import SavedPlaylists from '../SavedPlaylists/SavedPlaylists';
import axios from 'axios';

function ProfileContent({ header }) {
  const contentSection =
    header === 'Playlists' ? <SavedPlaylists /> : <Stats />;

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
