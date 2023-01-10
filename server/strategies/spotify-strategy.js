const SpotifyStrategy = require('passport-spotify').Strategy;
require('dotenv').config();
const knex = require('knex')(require('../knexfile').development);
const express = require('express');
const app = express();

const port = process.env.PORT;
//localhost:8080/auth/callback
const authCallbackPath = '/auth/spotify/callback';

const spotifyStrategy = new SpotifyStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/spotify/callback',
  },
  function (accessToken, refreshToken, expires_in, profile, done) {
    // asynchronous verification, for effect...
    knex('users')
      .select('id')
      .where({ spotify_id: profile.id })
      .then((user) => {
        if (user.length) {
          // If user is found, pass the user object to serialize function
          done(null, user[0]);
        } else {
          knex('users')
            .insert({
              spotify_id: profile.id,
              access_token: accessToken,
              refresh_token: refreshToken,
              first_name: profile.displayName.split(' ')[0],
              last_name: profile.displayName.split(' ')[1],
              email: profile.emails[0].value,
            })
            .then((userId) => {
              // Pass the user object to serialize function
              done(null, { id: userId[0] });
            })
            .catch((err) => {
              console.log('Error creating a user', err);
            });
        }
        // return done(err, user);
      })
      .catch((err) => {
        console.log('Error fetching a user', err);
      });
  }
);

module.exports = spotifyStrategy;
