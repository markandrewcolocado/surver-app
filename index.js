const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// tell express that it needs to use cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // time before cookie expires
    keys: [keys.cookieKey], // key to be used in signing cookie
  })
);

// tell passport to use cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
  res.send({ hi: 'test' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
