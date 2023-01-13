import './Playlistgen.scss';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';

const Playlistgen = () => {
  const user = useContext(UserContext);
  console.log('recommended dta', user.recommended);

  return (
    <>
      <div className="plgen">
        <div className="plgen__heading">Here is your playlist</div>
        <div className="plgen__content-con">
          <div className="plgen__content-1">
            <div className="plgen__list">
              {user.recommended &&
                user.recommended.tracks.map((i) => (
                  <div className="plgen__track-con" key={i.id.toString()}>
                    <div
                      className="plgen__track-content1"
                      style={{
                        backgroundImage: `url(${i.album.images[2].url})`,
                      }}
                    ></div>
                    <div className="plgen__track-content2">
                      <div className="plgen__trackname">{i.name}</div>
                      <div className="plgen__artist">{i.artists[0].name}</div>
                      <div className="plgen__trackid">TrackID: {i.id}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="plgen__content-2">
            <div className="plgen__spotify-embed">spotify embed</div>
            <div className="plgen__buttons-con">
              <button className="plgen__btn-spotify">Open in Spotify</button>
              <button className="plgen__btn-save">save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlistgen;
