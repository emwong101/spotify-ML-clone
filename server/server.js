const path = require('node:path');

require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const express = require('express');
const session = require('express-session');
// const server = express();
const cors = require('cors');
const passport = require('passport');
const helmet = require('helmet');
const consolidate = require('consolidate');
const app = express();

const knex = require('knex')(require('./knexfile.js').development);

app.use(express.json());
app.use(cors());

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const spotifyStrategy = require('./strategies/spotify-strategy');
passport.use('spotify', spotifyStrategy);

// `serializeUser` determines which data of the auth user object should be stored in the session
// The data comes from `done` function of the strategy
// The result of the method is attached to the session as `req.session.passport.user = 12345`
passport.serializeUser((user, done) => {
  console.log('serializeUser (user object):', user.id);

  // Store only the user id in session
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  console.log('deserializeUser (user id):', userId);
  knex('users')
    .where({ id: userId })
    .then((user) => {
      // Remember that knex will return an array of records, so we need to get a single record from it
      // The full user object will be attached to request object as `req.user`
      done(null, user[0]);
    })
    .catch((err) => {
      console.log('Error finding user', err);
    });
});

// app.set('views', __dirname + '/views');
// app.set('view engine', 'html');

// app.engine('html', consolidate.nunjucks);

// app.get('/', function (req, res) {
//   res.render('index.html', { user: req.user });
// });

// app.get('/account', ensureAuthenticated, function (req, res) {
//   res.render('account.html', { user: req.user });
// });

// app.get('/login', function (req, res) {
//   res.render('login.html', { user: req.user });
// });

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const usersRoutes = require('./routes/usersRouter');
app.use('/user', usersRoutes);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} `);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
