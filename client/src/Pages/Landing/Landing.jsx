import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
//
function Landing() {
  const { isLoggedIn } = useContext(UserContext);
  // const { data } = await axios.get(
  //   "http://localhost:8080/user/1/getspotifytoken"
  // );
  console.log(isLoggedIn.data);
  console.log(isLoggedIn.auth);

  return (
    <>
      {isLoggedIn.auth ? (
        <div>
          <div>{isLoggedIn.data.spotify_id}</div>
          <div>
            <button>Logout</button>
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
