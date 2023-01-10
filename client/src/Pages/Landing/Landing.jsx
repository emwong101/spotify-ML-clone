import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
//
function Landing() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const params = useParams();
  // const { data } = await axios.get(
  //   "http://localhost:8080/user/1/getspotifytoken"
  // );

  // console.log(isLoggedIn.data);
  // console.log(isLoggedIn.auth);

  // useEffect(() => {
  //   if (user.auth) navigate('/discover');
  // }, [params]);
  console.log(user);

  useEffect(() => {
    if (user.auth) navigate('/discover');
  }, []);
  return (
    <>
      {user.auth ? (
        <div>
          <div>{user.profile.spotify_id}</div>
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
