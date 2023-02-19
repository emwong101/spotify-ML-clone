import "./PlaylistgenContent.scss";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import SpotifyEmbed from "../../Components/SpotifyEmbed/SpotifyEmbed";

const PlaylistgenContent = () => {
  const user = useContext(UserContext);
  let [externalurl, setExternalUrl] = useState(null);
  let [playlist_id, setPlaylist_id] = useState("");

  const { id, spotify_id, access_token } = user.profile;
  const current_pl = user.recommended;
  let save_pl_data = { id, current_pl };
  //create playlist
  const create_playlist = async () => {
    let data = await axios.get("http://localhost:8080/createplaylist", {
      withCredentials: true,
    });
    setExternalUrl(data.data.external_urls.spotify);
    // setPlaylist_id(data.data.id);
    if (data.status === 201) {
      addRecommendedTracks(data.data.id);
      save_pl_data["spotify_playlist_id"] = data.data.id;
      // console.log("new save_pl_data", save_pl_data);
    }
  };

  const addRecommendedTracks = async (pl_id) => {
    let uri_arr = [];
    current_pl.forEach((i) => uri_arr.push(i.uri));
    let url = "http://localhost:8080/addrecommendedtracks";
    let track_data = {
      pl_id,
      uri_arr,
    };
    await axios.post(url, track_data, { withCredentials: true });
  };

  const savePlaylist = async () => {
    const url = `http://localhost:8080/user/${id}/saveplaylist`;
    await create_playlist();
    await axios.post(`${url}`, save_pl_data);
  };

  return (
    <>
      <div className="playlistgen-content">
        <div className="playlistgen-content__container-2">
          <div className="playlistgen-hero">
            <div className="playlistgen-content__spotify-embed">
              {externalurl && <SpotifyEmbed externalurl={externalurl} />}
            </div>
          </div>
          <div className="playlistgen-content__heading">
            Here is your playlist
          </div>
          <div className="playlistgen-content__content-con">
            <div className="playlistgen-content__content-1">
              <div className="playlistgen-content__list">
                {user.recommended &&
                  user.recommended.map((i) => (
                    <div
                      className="playlistgen-content__track-con"
                      key={i.id.toString()}
                    >
                      <div
                        className="playlistgen-content__track-content1"
                        style={{
                          backgroundImage: `url(${i.album.images[2].url})`,
                        }}
                      ></div>
                      <div className="playlistgen-content__track-content2">
                        <div className="playlistgen-content__trackname">
                          {i.name}
                        </div>
                        <div className="playlistgen-content__artist">
                          {i.artists[0].name}
                        </div>
                        <div className="playlistgen-content__trackid">
                          TrackID: {i.id}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="playlistgen-content__content-2">
              <div className="playlistgen-content__buttons-con">
                <button className="playlistgen-content__btn-spotify">
                  Open in Spotify
                </button>
                <button
                  className="playlistgen-content__btn-save"
                  onClick={() => savePlaylist()}
                >
                  save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaylistgenContent;
