import './Playlistgen.scss';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';
import SpotifyEmbed from '../../Components/SpotifyEmbed/SpotifyEmbed';

const Playlistgen = () => {
  const user = useContext(UserContext);
  let [externalurl, setExternalUrl] = useState(null);
  let [playlist_id, setPlaylist_id] = useState('');

  const { id, spotify_id, access_token } = user.profile;
  const current_pl = user.recommended;
  let save_pl_data = { id, current_pl };
  //create playlist
  const create_playlist = async () => {
    const url = `https://api.spotify.com/v1/users/${spotify_id}/playlists`;
    const req_body = {
      name: 'spotifyML-test',
      description: 'New playlist description for testing',
      public: false,
    };
    let data = await axios
      .post(url, req_body, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .catch((err) => {
        if (err.response.status === 401) {
          // make a call to the backend to get new access token
        }
      });
    setExternalUrl(data.data.external_urls.spotify);
    // setPlaylist_id(data.data.id);
    if (data.status === 201) addRecommendedTracks(data.data.id);
  };

  const addRecommendedTracks = (pl_id) => {
    let uri_arr = [];
    current_pl.forEach((i) => uri_arr.push(i.uri));

    const url = `https://api.spotify.com/v1/playlists/${pl_id}/tracks?uris=${uri_arr.join(
      ','
    )}`;
    let { data } = axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .catch((err) => {
        if (err.response.status === 401) {
          // make a call to the backend to get new access token
        }
      });
    // setUris(uri_arr);
  };

  const savePlaylist = async () => {
    const url = `http://localhost:8080/user/${id}/saveplaylist`;
    await axios.post(`${url}`, save_pl_data);
    create_playlist();
  };

  return (
    <>
      <div className="plgen">
        <div className="plgen__heading">Here is your playlist</div>
        <div className="plgen__content-con">
          <div className="plgen__content-1">
            <div className="plgen__list">
              {user.recommended &&
                user.recommended.map((i) => (
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
            <div className="plgen__spotify-embed">
              {externalurl && <SpotifyEmbed externalurl={externalurl} />}
            </div>
            <div className="plgen__buttons-con">
              <button className="plgen__btn-spotify">Open in Spotify</button>
              <button
                className="plgen__btn-save"
                onClick={() => savePlaylist()}
              >
                save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlistgen;
