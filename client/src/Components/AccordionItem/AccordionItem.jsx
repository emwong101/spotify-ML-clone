import "./AccordionItem.scss";
import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
// import { FaChevronDown } from "react-icons/fa";
// import { FaChevronUp } from "react-icons/fa";
const AccordionItem = ({ open, children, title, spotify_playlist_id }) => {
  const [isOpen, setIsOpen] = useState(open);
  const [coverURL, setCoverURL] = useState("");
  const ref = useRef(null);
  let user = useContext(UserContext);

  let url = `https://api.spotify.com/v1/playlists/${spotify_playlist_id}/images`;

  const [height, setHeight] = useState(open ? undefined : 0);
  const handleOpening = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    const grabPlaylistCover = async () => {
      let { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.profile.access_token}`,
        },
      });
      // console.log("grab image: ", data[2].url);
      setCoverURL(data[2].url);
    };
    grabPlaylistCover();
  }, []);

  useEffect(() => {
    if (!height || !isOpen || !ref.current) return undefined;
    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height);
    });
    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [height, isOpen]);
  useEffect(() => {
    if (isOpen) setHeight(ref.current?.getBoundingClientRect().height);
    else setHeight(0);
  }, [isOpen]);

  return (
    <>
      <div className="accordion">
        <div className="accordion__con1">
          <div className="accordion__header">
            <div
              className="accordion__pl-cover"
              style={{ backgroundImage: `url(${coverURL})` }}
            ></div>
            <div className="accordion__header-wrapper">
              <div className="accordion__title">{title}</div>
              <button className="accordion__btn" onClick={handleOpening}>
                {!isOpen ? "Close" : "Open"}
              </button>
            </div>
          </div>
        </div>
        <div className="accordion__con2">
          <div className="my-collapse" style={{ height }}>
            <div ref={ref}>
              <div className="accordion__saved-pl-c">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccordionItem;
