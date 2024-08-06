// services/authMiddleware.js
const jwt = require('jsonwebtoken');
const myEventEmitter = require('./logEvents'); // Import event logger if needed

function authenticateJWT(req, res, next) {
    console.log('Authenticating JWT');
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.error('JWT verification failed:', err);
                myEventEmitter.emit('event', 'authMiddleware.authenticateJWT', 'ERROR', `JWT verification failed: ${err.message}`);
                return res.status(403).send('Unauthorized'); // Ensure error message is not JSON
            }
            console.log('JWT verified successfully');
            myEventEmitter.emit('event', 'authMiddleware.authenticateJWT', 'INFO', 'JWT verified successfully');
            req.user = user;
            next();
        });
    } else {
        console.log('No authorization header found');
        myEventEmitter.emit('event', 'authMiddleware.authenticateJWT', 'WARN', 'No authorization header found');
        return res.status(401).send('Unauthorized'); // Ensure error message is not JSON
    }
}

function setToken(req, res, next) {
    if (req.session && req.session.token) {
        console.log('Setting JWT token from session');
        req.headers['authorization'] = `Bearer ${req.session.token}`;
        myEventEmitter.emit('event', 'authMiddleware.setToken', 'INFO', 'JWT token set from session');
    } else {
        console.log('No token found in session');
        myEventEmitter.emit('event', 'authMiddleware.setToken', 'WARN', 'No token found in session');
    }
    next();
}

module.exports = { authenticateJWT, setToken };
