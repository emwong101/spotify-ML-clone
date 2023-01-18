import "./SpotifyEmbed.scss";
import { useContext, useState, useEffect } from "react";
import parse from "html-react-parser";
import axios from "axios";

const SpotifyEmbed = ({ externalurl }) => {
  let [html_iframe, setHtml_iframe] = useState(null);
  const render_oEmbed = async () => {
    let { data } = await axios.post("http://localhost:8080/embed", {
      externalurl: externalurl,
    });
    console.log("render_oEmbed", data.html);
    setHtml_iframe(data.html);
  };
  useEffect(() => {
    render_oEmbed();
    // if (html_iframe) console.log("html_iframe", html_iframe);
  }, []);

  return (
    <>
      <div className="spotify-embed">
        {externalurl ? html_iframe && parse(html_iframe) : "EMBED"}
      </div>
    </>
  );
};

export default SpotifyEmbed;
