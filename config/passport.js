const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const pool = require('../config/pgdb');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
      console.log('Authenticating user');
      pool.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
        if (err) throw err;
        if (result.rows.length === 0) {
          return done(null, false, { message: 'No user found' });
        }
        const user = result.rows[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    console.log('Serializing user');
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('Deserializing user');
    pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
      done(err, result.rows[0]);
    });
  });
};
