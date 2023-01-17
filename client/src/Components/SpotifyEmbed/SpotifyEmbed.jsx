import "./SpotifyEmbed.scss";
import { useContext, useState, useEffect } from "react";
import parse from "html-react-parser";
import axios from "axios";

const SpotifyEmbed = () => {
  let [html_iframe, setHtml_iframe] = useState(null);
  const render_oEmbed = async () => {
    let { data } = await axios.post("http://localhost:8080/embed", {});
    console.log("render_oEmbed", data.html);
    setHtml_iframe(data.html);
  };
  useEffect(() => {
    render_oEmbed();
    // if (html_iframe) console.log("html_iframe", html_iframe);
  }, []);

  return (
    <>
      <div className="spotify-embed">{html_iframe && parse(html_iframe)}</div>
    </>
  );
};

export default SpotifyEmbed;
