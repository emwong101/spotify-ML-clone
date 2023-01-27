import './Landing.scss';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
//
function Landing() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (user.profile.access_token) navigate('/profile');
  }, []);

  return (
    <>
      <div className="landing">
        {user.profile.id ? (
          <div className="landing__profile-container">
            <div className="landing__profile">{user.profile.spotify_id}</div>
            <div>
              <a href="http://localhost:8080/auth/logout">
                <button
                  type="button"
                  className="landing__button"
                  onClick={() => {
                    sessionStorage.clear();
                  }}
                >
                  Logout
                </button>
              </a>
            </div>
          </div>
        ) : (
          <div className="landing__profile-container">
            <div className="landing__heading-txt">
              Connect your Spotify Account
            </div>
            <div>
              <a href="http://localhost:8080/auth/spotify">
                <button type="button" className="landing__button">
                  Login
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Landing;
