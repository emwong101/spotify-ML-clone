const express = require('express');
const router = express.Router();
const passport = require('passport');

let authCallbackPath = 'http://localhost:8080/auth/callback';
// let authCallbackPath = 'spotify/callback';

// Create a login endpoint which kickstarts the auth process and takes user to a consent page
// Here, you can also specify exactly what type of access you are requesting by configuring scope: https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
// ie: passport.authenticate("github", { scope: ["user:email", "repo"] })
router.get(
  '/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true,
  })
);

// router.get(
//   authCallbackPath,
//   passport.authenticate('spotify', { failureRedirect: '/login' }),
//   function (req, res) {
//     res.redirect('/');
//   }
// );

//localhost:8080/auth/callback

router.get(
  '/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (_req, res) => {
    // Successful authentication, redirect to client-side application
    res.redirect('/account');
  }
);

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
