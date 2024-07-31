const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        if(DEBUG) console.log('Status: 401');
        // return res.sendStatus(401);
        req.session.status = 'Please log in to view this page.';
        res.redirect('/auth');
    }
};

const setToken = (req, res, next) => {
    if (req.session && req.session.token) {
        req.headers['authorization'] = `Bearer ${req.session.token}`;
    }
    next();
};


module.exports = { 
    authenticateJWT,
    setToken
};