const express = require('express');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const router = express.Router();
const myEventEmitter = require('../services/logEvents.js');

const { addLogin, getLoginByUsername } = require('../services/m.auth.dal');

// Display login page
router.get('/', (req, res) => {
    myEventEmitter.emit('event', 'auth.get /', 'INFO', 'Login page displayed.');
    res.render('login', { status: req.session.status });
});

// Handle login
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await getLoginByUsername(username);

        if (!user) {
            req.session.status = 'Incorrect username.';
            myEventEmitter.emit('event', 'auth.post /', 'WARN', 'Login failed: Incorrect username.');
            return res.redirect('/auth');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            req.session.status = 'Incorrect password.';
            myEventEmitter.emit('event', 'auth.post /', 'WARN', 'Login failed: Incorrect password.');
            return res.redirect('/auth');
        }

        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        req.session.user = user;
        req.session.token = token;
        req.session.status = 'Happy to have you back ' + user.username;
        myEventEmitter.emit('event', 'auth.post /', 'SUCCESS', `User ${username} logged in successfully.`);
        res.redirect('/');
    } catch (error) {
        console.error('Login error:', error);
        myEventEmitter.emit('event', 'auth.post /', 'ERROR', `Login error: ${error.message}`);
        res.status(500).render('error', { error: 'An error occurred during login.' });
    }
});

// Display registration page
router.get('/new', (req, res) => {
    myEventEmitter.emit('event', 'auth.get /new', 'INFO', 'Registration page displayed.');
    res.render('register', { status: req.session.status });
});

// Handle registration
router.post('/new', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            req.session.status = 'All fields are required.';
            myEventEmitter.emit('event', 'auth.post /new', 'WARN', 'Registration failed: Missing fields.');
            return res.redirect('/auth/new');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await addLogin(username, email, hashedPassword, uuid.v4());

        req.session.status = 'New account created, please login.';
        myEventEmitter.emit('event', 'auth.post /new', 'SUCCESS', `User ${username} registered successfully.`);
        res.redirect('/auth');
    } catch (error) {
        console.error('Registration error:', error);
        myEventEmitter.emit('event', 'auth.post /new', 'ERROR', `Registration error: ${error.message}`);
        if (error.code === 11000) { // MongoDB unique constraint violation
            req.session.status = 'Username or Email already exists, please try another.';
            res.redirect('/auth/new');
        } else {
            console.error('Detailed error:', error);
            res.status(500).render('error', { error: 'An error occurred during registration. ' + error.message });
        }
    }
});

// Handle logout
router.get('/exit', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Logout error:', err);
            myEventEmitter.emit('event', 'auth.get /exit', 'ERROR', `Logout error: ${err.message}`);
            return res.status(500).send('Could not log out.');
        }
        myEventEmitter.emit('event', 'auth.get /exit', 'SUCCESS', 'User logged out successfully.');
        res.redirect('/');
    });
});

module.exports = router;