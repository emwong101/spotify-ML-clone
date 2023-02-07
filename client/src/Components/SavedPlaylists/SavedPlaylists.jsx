import "./SavedPlaylists.scss";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import prettyMilliseconds from "pretty-ms";

const SavedPlaylists = ({ playlist_data }) => {
  let user = useContext(UserContext);
  // console.log("playlist_data: ", JSON.parse(playlist_data));

  const renderPlaylists = () => {
    // const pl_data = user.savedplaylists;
    if (Object.keys(playlist_data).length !== 0) {
      return (
        <>
          <div className="saved-pl">
            <div className="saved-pl__tracklist">
              {JSON.parse(playlist_data).map((track) => (
                <div className="saved-pl__track" key={`${track.id}`}>
                  <div className="saved-pl__track-primary-con">
                    <div className="saved-pl__track-cover-con">
                      <div
                        className="saved-pl__track-cover"
                        style={{
                          backgroundImage: `url(${track.album.images[2].url})`,
                        }}
                      >
                        <div className="inner-circle-w"></div>
                        <div className="inner-circle-g"></div>
                      </div>
                    </div>
                    {/* title-album
                     * <div className="saved-pl__title-album-con">
                     *   <div className="saved-pl__track-title">{track.name}</div>
                     *   {#<{(|
                     *    * <div className="saved-pl__track-album">
                     *    *   {track.album.name}
                     *    * </div>
                     *    |)}>#}
                     *   <div className="saved-pl__track-artist">
                     *     {track.artists[0].name}
                     *   </div>
                     * </div>
                     */}
                  </div>
                  {/* duration
                   * <div className="saved-pl__track-duration">
                   *   {prettyMilliseconds(track.duration_ms, {
                   *     secondsDecimalDigits: 0,
                   *   })}
                   * </div>
                   */}
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
  // useEffect(() => {
  //   grabSavedPlaylists();
  // }, []);
  return <>{renderPlaylists()}</>;
};

export default SavedPlaylists;
