const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// Sign the user for cookie use
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the cookie to get the content and attach it to req obj
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback', // relative path
      // If the code is deployed to a hosting site, example render.com, it uses a proxy to ensure
      // the traffic is routed to the correct server
      // The strategy assumes that if a request from a browser goes through a proxy,
      // then the request should no longer be https
      // this will lead to incorrect redirect uri error during authentication,
      // using proxy = true will fix this issue
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = await new User({
        googleId: profile.id,
      }).save();
      done(null, newUser);
    }
  )
);
