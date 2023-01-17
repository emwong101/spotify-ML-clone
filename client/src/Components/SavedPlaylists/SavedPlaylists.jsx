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
      user.setSavedplaylistsData(data);
      // localStorage.setItem("saved playlists", JSON.stringify(data));
      console.log(data);
    }
  };

  const renderPlaylists = () => {
    const pl_data = user.savedplaylists;
    if (Object.keys(pl_data).length !== 0) {
      return (
        <>
          <div className="saved-pl">
            <h1>Saved Playlists content</h1>
            <div className="saved-pl__list">
              {pl_data.map((i) => (
                <div className="saved-pl__single-pl" key={i.playlist_id}>
                  <div className="saved-pl__pl-id">
                    Playlist #{i.playlist_id}
                  </div>
                  <div className="saved-pl__track-lists">
                    {JSON.parse(i.playlist_data).tracks.map((track) => (
                      <div className="saved-pl__track" key={`${track.id}`}>
                        <div
                          className="saved-pl__track-cover"
                          style={{
                            backgroundImage: `url(${track.album.images[2].url})`,
                          }}
                        ></div>
                        <div className="saved-pl__text-con">
                          <div className="saved-pl__track-name">
                            {track.name}
                          </div>
                          <div className="saved-pl__track-artist"></div>
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
    } else {
      return (
        <>
          <h1>No saved playlists</h1>
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
