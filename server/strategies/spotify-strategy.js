const SpotifyStrategy = require('passport-spotify').Strategy;
require('dotenv').config();
const knex = require('knex')(require('../knexfile').development);

const port = process.env.PORT;
const authCallbackPath = '/callback';

const spotifyStrategy = new SpotifyStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:8888' + authCallbackPath,
  },
  function (accessToken, refreshToken, expires_in, profile, done) {
    // asynchronous verification, for effect...
    console.log('spotify profile:', profile);
    process.nextTick(function () {
      // To keep the example simple, the user's spotify profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the spotify account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
);

module.exports = spotifyStrategy;
