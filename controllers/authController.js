const bcrypt = require('bcryptjs');
const passport = require('passport');
const pool = require('../config/pgdb');
const uuid = require('uuid');
const logEvents = require('../logging/logEvents');
const eventEmitter = require('events');

// Create the class MyEmitter to define it, making sure to the first letter is upper case, this is for classes
class MyEmitter extends eventEmitter {}
// This instantiates a new emitter object that will be needed to access the index page
const myEmitter = new MyEmitter();

// Creating an dot addListener or dot on function, it will have name "status", this could be anything and functions below can have different names
// to serve different purposes then there are in this case 3 parameters, event, level (ex: information, error), and a message that can be logged
myEmitter.on("status", (msg, theStatusCode) => {
  // once the above part of the listeners has exicuted its block
  // the logEvents function in logEvents.js will fire and the parameters here will be sent over to be processed
  logEvents(msg, theStatusCode);
});

// Render index page with forms for signup and login
exports.getIndexPage = (req, res) => {
  console.log('Rendering index page');
  res.render('index');
};

// Register user
exports.registerUser = async (req, res) => {
  console.log('Registering user');
  const { name, username, password } = req.body;
  let errors = [];

  if (!name || !username || !password) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('index', {
      errors,
      name,
      username,
      password,
    });
  } else {
    try {
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (result.rows.length > 0) {
        errors.push({ msg: 'Username already exists' });
        res.render('index', {
          errors,
          name,
          username,
          password,
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
          name,
          username,
          password: hashedPassword,
          id: uuid.v4(),
        };

        await pool.query(
          'INSERT INTO users (name, username, password, id) VALUES ($1, $2, $3, $4)',
          [newUser.name, newUser.username, newUser.password, newUser.id]
        );
        console.log('User registered successfully');
        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
};

// Login user
exports.loginUser = (req, res, next) => {
  console.log('Logging in user');
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('error_msg', 'Incorrect username or password');
      return res.redirect('/');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      if (user.username === 'admin@vinovault.ca') {
        return res.redirect('/admin');
      }
      return res.redirect('/dashboard');
    });
  })(req, res, next);
};

// Logout user
exports.logoutUser = (req, res) => {
  console.log('Logging out user');
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
};

// Ensure authentication
exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Please log in to view that resource');
  res.redirect('/');
};

// Ensure admin role
exports.ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.username === 'admin@vinovault.ca') {
    return next();
  }
  req.flash('error_msg', 'Admin access required');
  res.redirect('/');
};
