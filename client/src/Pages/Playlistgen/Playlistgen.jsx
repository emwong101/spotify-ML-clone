import "./Playlistgen.scss";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import SpotifyEmbed from "../../Components/SpotifyEmbed/SpotifyEmbed";

const Playlistgen = () => {
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
