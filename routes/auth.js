const express = require('express');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const router = express.Router();
const myEventEmitter = require('../services/logEvents');
const { addLogin, getLoginByEmail } = require('../services/m.auth.dal');

// Correct import path for the middleware
const { authenticateJWT } = require('../services/authMiddleware');

// Display login page
router.get('/', (req, res) => {
    console.log('Displaying login page');
    myEventEmitter.emit('event', 'auth.get /', 'INFO', 'Login page displayed.');
    res.render('login', { status: req.session.status });
});

// Handle login
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Login attempt for email: ${email}`);
        const user = await getLoginByEmail(email);

        if (!user) {
            req.session.status = 'Incorrect email.';
            myEventEmitter.emit('event', 'auth.post /', 'WARN', 'Login failed: Incorrect email.');
            return res.redirect('/auth');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            req.session.status = 'Incorrect password.';
            myEventEmitter.emit('event', 'auth.post /', 'WARN', 'Login failed: Incorrect password.');
            return res.redirect('/auth');
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        req.session.user = user;
        req.session.token = token;
        req.session.status = 'Happy to have you back ' + user.username;
        myEventEmitter.emit('event', 'auth.post /', 'SUCCESS', `User ${email} logged in successfully.`);

        // Set token in a cookie
        res.cookie('token', token, { httpOnly: true });

        res.redirect('/search');  // Redirect to search page after successful login
    } catch (error) {
        console.error('Login error:', error);
        myEventEmitter.emit('event', 'auth.post /', 'ERROR', `Login error: ${error.message}`);
        res.status(500).render('error', { error: 'An error occurred during login.' });
    }
});

// Display registration page
router.get('/new', (req, res) => {
    console.log('Displaying registration page');
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

        if (result.error) {
            req.session.status = result.error;
            myEventEmitter.emit('event', 'auth.post /new', 'WARN', `Registration failed: ${result.error}`);
            return res.redirect('/auth/new');
        }

        req.session.status = 'New account created, please login.';
        myEventEmitter.emit('event', 'auth.post /new', 'SUCCESS', `User ${email} registered successfully.`);
        res.redirect('/auth');
    } catch (error) {
        console.error('Registration error:', error);
        myEventEmitter.emit('event', 'auth.post /new', 'ERROR', `Registration error: ${error.message}`);
        res.status(500).render('error', { error: 'An error occurred during registration.' });
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
        res.clearCookie('token');
        res.redirect('/');
    });
});

module.exports = router;
