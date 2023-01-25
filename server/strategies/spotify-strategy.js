const SpotifyStrategy = require('passport-spotify').Strategy;
require('dotenv').config();
const knex = require('knex')(require('../knexfile').development);
const express = require('express');
const app = express();

const port = process.env.PORT;
const authCallbackPath = '/auth/spotify/callback';

const spotifyStrategy = new SpotifyStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/spotify/callback',
  },
  function (accessToken, refreshToken, expires_in, profile, done) {
    knex('users')
      .select('id')
      .where({ spotify_id: profile.id })
      .then((user) => {
        if (user.length) {
          // If user is found, pass the user object to serialize function
          const obj = {
            expiry: expires_in,
            access_token: accessToken,
            refresh_token: refreshToken,
          };
          done(null, { id: user[0].id, data: obj });
        } else {
          knex('users')
            .insert({
              spotify_id: profile.id,
              // access_token: accessToken,
              // refresh_token: refreshToken,
              first_name: profile.displayName.split(' ')[0],
              last_name: profile.displayName.split(' ')[1],
              profile_picture: profile.photos[0].value,
              email: profile.emails[0].value,
            })
            .then((userId) => {
              // Pass the user object to serialize function
              const obj = {
                expiry: expires_in,
                access_token: accessToken,
                refresh_token: refreshToken,
              };
              done(null, {
                id: userId[0],
                data: obj,
              });
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
