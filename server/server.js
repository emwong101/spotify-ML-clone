const path = require("node:path");

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const express = require("express");
const session = require("express-session");
// const server = express();
const cors = require("cors");
const passport = require("passport");
const helmet = require("helmet");
const consolidate = require("consolidate");
const app = express();
const axios = require("axios");

const knex = require("knex")(require("./knexfile.js").development);

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
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const spotifyStrategy = require("./strategies/spotify-strategy");
passport.use("spotify", spotifyStrategy);

// `serializeUser` determines which data of the auth user object should be stored in the session
// The data comes from `done` function of the strategy
// The result of the method is attached to the session as `req.session.passport.user = 12345`
passport.serializeUser((user, done) => {
  // console.log('serializeUser (user object):', user.id);

  // Store only the user id in session
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  // console.log('deserializeUser (user id):', userId);
  knex("users")
    .where({ id: userId })
    .then((user) => {
      // Remember that knex will return an array of records, so we need to get a single record from it
      // The full user object will be attached to request object as `req.user`
      done(null, user[0]);
    })
    .catch((err) => {
      console.log("Error finding user", err);
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

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.get("/refresh_token", (req, res) => {
  let refresh_token = req.user.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  axios.post(authOptions, function (error, response, body) {
    console.log(body);
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
  res.status(200).json(req.user.refresh_token);
});

app.post("/recommendations", (req, res) => {
  const getRecommendations = async () => {
    let { data } = await axios.get(
      `https://api.spotify.com/v1/recommendations?limit=${req.body.length}&seed_artists=${req.body.artists}&${req.body.mood}`,
      {
        headers: {
          Authorization: `Bearer BQDcQRtqDbz0QP-3FPQPXWSgfUS39SC27tGcqo1ccpOW704A97uADXrWK__nkARJAVzw9u6jap9qROJp1IQqHoNIGj6Hdbnh_vKeSIEQeylh6M2C9pROhkdqtWDCuujX5dknUmjnqbAbos0TeESYGwJtmZAooyIDFDeic2U6rBdBi8UTc3V40iXJzW9mBDHXCys`,
        },
      }
    );
    console.log(req.user);
    res.send(data);
  };

  getRecommendations();
});

const usersRoutes = require("./routes/usersRouter");
app.use("/user", usersRoutes);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} `);
});

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// }
