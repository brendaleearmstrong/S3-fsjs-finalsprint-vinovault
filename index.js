const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const path = require('path');
require('dotenv').config();

const app = express();

// Passport config
require('./config/passport')(passport);

// EJS
app.set('view engine', 'ejs');

// Bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/api/home'));
app.use('/auth', require('./routes/api/auth'));
app.use('/wines', require('./routes/api/wines'));
app.use('/search', require('./routes/api/search'));
app.use('/admin', require('./routes/api/admin'));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`));
