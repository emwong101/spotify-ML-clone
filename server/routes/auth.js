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
    scope: [
      'user-read-email',
      'user-read-private',
      'user-top-read',
      'playlist-modify-private',
      'playlist-modify-public',
    ],
    showDialog: true,
  })
);

router.get(
  '/spotify/callback',
  passport.authenticate('spotify', {
    failureRedirect: 'http://localhost:5173/landing',
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    // res.redirect('/');
    res.redirect('http://localhost:5173/profile');
  }
);

// User profile endpoint that requires authentication
router.get('/profile', (req, res) => {
  // Passport stores authenticated user information on `req.user` object.
  // Comes from done function of `deserializeUser`
  // If `req.user` isn't found send back a 401 Unauthorized response
  if (req.user === undefined)
    return res.status(401).json({ message: 'Unauthorized' });

  // If user is currently authenticated, send back user info
  res.status(200).json(req.user);
});

router.get('/logout', function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('http://localhost:5173/landing');
  });
});

module.exports = router;
