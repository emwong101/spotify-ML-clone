const path = require('node:path');

require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const helmet = require('helmet');
const app = express();
const axios = require('axios');
const knex = require('knex')(require('./knexfile.js').development);

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
  })
);

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(helmet());

app.use(passport.initialize());
app.use(passport.session());

const spotifyStrategy = require('./strategies/spotify-strategy');
const refresh = require('passport-oauth2-refresh');
passport.use('spotify', spotifyStrategy);
refresh.use('spotify', spotifyStrategy);

// `serializeUser` determines which data of the auth user object should be stored in the session
// The data comes from `done` function of the strategy
// The result of the method is attached to the session as `req.session.passport.user = 12345`
passport.serializeUser((user, done) => {
  // Store only the user id in session
  let userData = {
    id: user.id,
    expiry: user.data.expiry,
    access_token: user.data.access_token,
    refresh_token: user.data.refresh_token,
  };
  done(null, userData);
});

passport.deserializeUser((userData, done) => {
  knex('users')
    .where({ id: userData.id })
    .then((user) => {
      // Remember that knex will return an array of records, so we need to get a single record from it
      // The full user object will be attached to request object as `req.user`

      let userProfile = user[0];
      user[0]['expiry'] = userData.expiry;
      user[0]['refresh_token'] = userData.refresh_token;
      user[0]['access_token'] = userData.access_token;
      return done(null, user[0]);
    })
    .catch((err) => {
      console.log('Error finding user', err);
    });
});

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const usersRoutes = require('./routes/usersRouter');
const { reset } = require('nodemon');
app.use('/user', usersRoutes);

app.get('/refresh', (req, res, next) => {
  refresh.requestNewAccessToken(
    'spotify',
    req.user.refresh_token,
    function (err, accessToken, refreshToken) {
      // You have a new access token, store it in the user object,
      // or use it to make a new request.
      // `refreshToken` may or may not exist, depending on the strategy you are using.
      // You probably don't need it anyway, as according to the OAuth 2.0 spec,
      // it should be the same as the initial refresh token.
      let userProfile = req.user;
      userProfile['access_token'] = accessToken;
      //update the passport session with the new access token
      req.session.passport.user['access_token'] = accessToken;
      res.status(200).json(userProfile);
    }
  );
});

app.post('/recommendations', (req, res) => {
  const getRecommendations = async () => {
    let { data } = await axios.get(
      `https://api.spotify.com/v1/recommendations?limit=${req.body.length}&seed_artists=${req.body.artists}&${req.body.mood}`,
      {
        headers: {
          Authorization: `Bearer ${req.user.access_token}`,
        },
      }
    );
    res.status(200).json(data);
  };

  getRecommendations();
});

app.post('/artists', (req, res) => {
  const getTopArtists = async () => {
    let { data } = await axios.get(
      `https://api.spotify.com/v1/me/top/artists?time_range=${req.body.query}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${req.user.access_token}`,
        },
      }
    );
    res.status(200).json(data);
  };

  getTopArtists();
});

app.post('/tracks', (req, res) => {
  const getTopTracks = async () => {
    let { data } = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${req.body.query}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${req.user.access_token}`,
        },
      }
    );
    res.status(200).json(data);
  };

  getTopTracks();
});

app.post('/embed', (req, res) => {
  const render_oEmbed = async () => {
    const base_uri = 'https://open.spotify.com/oembed';
    // const track_uri = 'https://open.spotify.com/track/6chdRBWviHlm7JAtwgflBP';
    let { data } = await axios.get(`${base_uri}/?url=${req.body.externalurl}`);
    res.status(201).json(data);
  };
  render_oEmbed();
});

app.get('/createplaylist', (req, res) => {
  let createPlaylist = async () => {
    const url = `https://api.spotify.com/v1/users/${req.user.spotify_id}/playlists`;
    const req_body = {
      name: 'spotifyML-test',
      description: 'New playlist description for testing',
      public: false,
    };
    let data = await axios
      .post(url, req_body, {
        headers: {
          Authorization: `Bearer ${req.user.access_token}`,
        },
      })
      .catch((err) => {
        if (err.response === 401) {
          // make a call to the backend to get new access token
        }
      });
    res.status(data.status).json(data.data);
  };
  createPlaylist();
});

app.post('/addrecommendedtracks', (req, res) => {
  let { pl_id, uri_arr } = req.body;
  const addTracks = async () => {
    const url = `https://api.spotify.com/v1/playlists/${pl_id}/tracks?uris=${uri_arr.join(
      ','
    )}`;
    let { data } = await axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${req.user.access_token}`,
          },
        }
      )
      .catch((err) => {
        if (err.response.status === 401) {
          // make a call to the backend to get new access token
        }
      });
    res.status(200).json(data);
  };
  addTracks();
});

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} `);
});
