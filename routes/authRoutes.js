const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/api/logout', (req, res) => {
    // logout function automatically added by passportjs
    req.logout();
    res.send({ message: 'You are now logged out.' });
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
