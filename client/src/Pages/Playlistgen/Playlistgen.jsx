import "./Playlistgen.scss";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";

const Playlistgen = () => {
  const [tracks, setTracks] = useState([]);
  const user = useContext(UserContext);
  const tracks_ep = "https://api.spotify.com/v1/me/top/tracks";
  //this is just temporary code will update to the recommendations endpoint later on

  const grabTracks = () => {
    axios
      .get(`${tracks_ep}`, {
        headers: {
          Authorization: `Bearer ${user.profile.access_token}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setTracks(res.data.items);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          // make a call to the backend to get new access token
        }
      });
  };

  useEffect(() => {
    if (user.auth) grabTracks();
  }, []);

  console.log("tracks: ", tracks);
  return (
    <>
      <div className="plgen">
        <div className="plgen__heading">Here is your playlist</div>
        <div className="plgen__content-con">
          <div className="plgen__content-1">
            <div className="plgen__list">
              {tracks.map((i) => (
                <div className="plgen__track-con">
                  <div
                    className="plgen__track-content1"
                    style={{ backgroundImage: `url(${i.album.images[2].url})` }}
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
