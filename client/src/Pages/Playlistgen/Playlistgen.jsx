import "./Playlistgen.scss";
import PlaylistgenContent from "../../Components/PlaylistgenContent/PlaylistgenContent";
import PlaylistgenLeftbar from "../../Components/PlaylistgenLeftbar/PlaylistgenLeftbar";

const Playlistgen = () => {
  return (
    <>
      <div className="playlist-gen">
        <section className="playlist-gen__main">
          <div className="playlist-gen__leftbar">
            <PlaylistgenLeftbar />
          </div>
          <div className="playlist-gen__content">
            <PlaylistgenContent />
          </div>
        </section>
      </div>
    </>
  );
};

export default Playlistgen;
