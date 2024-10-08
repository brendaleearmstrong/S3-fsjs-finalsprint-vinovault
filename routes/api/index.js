const express = require('express');
const router = express.Router();
const { setToken, authenticateJWT } = require('../../services/authMiddleware');

if (DEBUG) {
    console.log('ROUTE: /api/auth');
    console.log('ROUTE: /api/full');
}

// Use the setToken middleware to set the JWT token from the session
router.use(setToken);

// Protect all API routes with the authenticateJWT middleware
router.use(authenticateJWT);

// Import routers
const authRouter = require('./auth');
const fullRouter = require('./fullText');

// http://localhost:3000/api/auth/
router.use('/auth', authRouter);

// http://localhost:3000/api/full/
router.use('/full', fullRouter);

module.exports = router;

