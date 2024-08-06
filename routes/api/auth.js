const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const myEventEmitter = require('../../services/logEvents');

// Correct import path for the middleware
const { authenticateJWT } = require('../../services/authMiddleware'); // Correct destructuring

// Middleware to set the token from session
const setToken = (req, res, next) => {
    if (req.session && req.session.token) {
        console.log('Setting JWT token from session');
        req.headers['authorization'] = `Bearer ${req.session.token}`;
        myEventEmitter.emit('event', 'auth.api.setToken', 'INFO', 'JWT token set from session');
    } else {
        console.log('No token found in session');
        myEventEmitter.emit('event', 'auth.api.setToken', 'WARN', 'No token found in session');
    }
    next();
};

// Sample route for API authentication
router.get('/status', authenticateJWT, (req, res) => {
    console.log('API Status Check');
    myEventEmitter.emit('event', 'api.auth.get /status', 'INFO', 'API status checked.');
    res.json({ status: 'API is running' });
});

module.exports = router;
