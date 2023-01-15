import "./SavedPlaylists.scss";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";

const SavedPlaylists = () => {
  let user = useContext(UserContext);
  const { id } = JSON.parse(localStorage.getItem("user profile"));
  let grabSavedPlaylists = async () => {
    let { data } = await axios.get(
      `http://localhost:8080/user/${id}/getuserplaylists`
    );
    if (data[0].playlist_id === null) {
      console.log("no saved playlists");
    } else {
      // let { tracks } = JSON.parse(data[0].playlist_data);
      user.setSavedplaylistsData(data);
      localStorage.setItem("saved playlists", JSON.stringify(data));
      console.log(data);
    }
    // console.log("data: ", JSON.parse(data[0].playlist_data));
  };

  const renderPlaylists = () => {
    const pl_data = JSON.parse(localStorage.getItem("saved playlists"));
    console.log(pl_data);
    if (pl_data.length !== 0) {
      return (
        <>
          <div className="saved-pl">
            <h1>Saved Playlists content</h1>
            <div className="saved-pl__list">
              {pl_data.map((i) => (
                <div classname="saved-pl__single-pl">
                  <div classname="saved-pl__pl-id">
                    playlist: {i.playlist_id}
                  </div>
                  <div classname="saved-pl__track-lists">
                    {JSON.parse(i.playlist_data).tracks.map((track) => (
                      <div classname="saved-pl__track">
                        <div
                          classname="saved-pl__track-cover"
                          style={{
                            backgroundImage: `url(${track.album.images[2].url})`,
                            width: "64px",
                            height: "64px",
                          }}
                        ></div>
                        <div classname="saved-pl__track-name">{track.name}</div>
                        <div classname="saved-pl__track-artist">
                          {track.artists[0].name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    }
  };
  useEffect(() => {
    grabSavedPlaylists();
  }, []);
  return <>{renderPlaylists()}</>;
};

export default SavedPlaylists;
