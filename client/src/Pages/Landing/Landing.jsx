import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
//
function Landing() {
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const params = useParams();
  // const { data } = await axios.get(
  //   "http://localhost:8080/user/1/getspotifytoken"
  // );

  // console.log(isLoggedIn.data);
  // console.log(isLoggedIn.auth);

  useEffect(() => {
    if (isLoggedIn.auth) navigate("/discover");
  }, [params]);

  // useEffect(() => {
  //   if (isLoggedIn.auth) navigate("/discover");
  // }, []);
  return (
    <>
      {isLoggedIn.auth ? (
        <div>
          <div>{isLoggedIn.data.spotify_id}</div>
          <div>
            <a href="http://localhost:8080/auth/logout">
              <button>Logout</button>
            </a>
          </div>
        </div>
      ) : (
        <div>
          <a href="http://localhost:8080/auth/spotify">
            <button>Login</button>
          </a>
        </div>
      )}
    </>
  );
}

export default Landing;
