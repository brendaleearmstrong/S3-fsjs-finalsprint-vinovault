const express = require('express');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const router = express.Router();
const myEventEmitter = require('../services/logEvents.js');

const { addLogin, getLoginByUsername } = require('../services/p.auth.dal')
// const { addLogin, getLoginByUsername } = require('../services/m.auth.dal')

router.get('/', async (req, res) => {
    if(DEBUG) console.log('login page: ');
    res.render('login', {status: req.session.status});
    return;
});

router.post('/', async (req, res) => {
    try {
        if(DEBUG) console.log('auth.getLoginByUsername().try');
        let user = await getLoginByUsername(req.body.username);
        if(user === undefined || user === null) {
            req.session.status = 'Incorrect user name was entered.'
            if(DEBUG) console.log(req.session.status);
            res.redirect('/auth');
            return;
        }
        if(DEBUG) console.log(`user data: ${user.username}`);
        if( await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '10m' });
            if(DEBUG) {
                console.log('\n');
                console.log('Copy and paste the following curl command to test the API.');
                console.log(`curl -H "Authorization: Bearer ${token}" -X GET http://localhost:3000/api/full/p/[keyword]`);
                console.log('\n');
            }
            myEventEmitter.emit('event', 'auth.post', 'SUCCESS', `User ${user.username} logged in successfully.`);
            if(DEBUG) console.log('auth.post.getLoginByUsername().try _id: ' + user._id);
            req.session.user = user;
            req.session.token = token;
            req.session.status = 'Happy for your return ' + user.username;
            res.redirect('/');
            return;
        } else {
            myEventEmitter.emit('event', 'auth.post', 'INVALID', `Incorrect password was entered.`);
            req.session.status = 'Incorrect password was entered.'
            res.redirect('/auth')
            return;
        }
    } catch (error) {
        if(DEBUG) console.log('auth.getLoginByUsername().catch.');
        console.log(error);
        myEventEmitter.emit('event', 'auth.post', 'ERROR', `Server error: 503.`);
        res.render('503');
        return;
    }
});

// GET (display) the register html page
router.get('/new', async (req, res) => {
    res.render('register', {status: req.session.status});
    return;
});

// POST (register) the new login
router.post('/new', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        if (req.body.email && req.body.username && req.body.password ) {
            var result = await addLogin(req.body.username, req.body.email, hashedPassword, uuid.v4());
            if(DEBUG) console.log('result: ' + result);
            // duplicate username, comes from uniqueness constraint 
            // in postgresql(err.code=23505) OR mongodb(err.code=11000)
            if(result.code === "23505" || result.code === 11000) {
                let constraint;
                function setConstraint(indexName) {
                    const constraintsMap = {
                        "unique_username": "Username",
                        "unique_email": "Email address"
                    };
                    return constraintsMap[indexName] || indexName; // Default to indexName if not found
                }
                
                if (result.code === "23505") { // PostgreSQL unique violation
                    myEventEmitter.emit('event', 'auth.post /new', 'INFO', `PostgreSQL unique violation: 23505`);
                    constraint = setConstraint(result.constraint);
                } else if (result.code === 11000) { // MongoDB unique violation
                    if (DEBUG) console.log(result.errmsg);
                    myEventEmitter.emit('event', 'auth.post /new', 'INFO', `MongoDB unique violation: 11000`);
                    const match = result.errmsg.match(/index: (\w+)/);
                    const indexName = match ? match[1] : 'unknown';
                    if (DEBUG) console.log(`Duplicate key error for index: ${indexName}`);
                    constraint = setConstraint(indexName);
                }
                if(DEBUG) console.log(`${constraint} already exists, please try another.`);
                req.session.status = `${constraint} already exists, please try another.`
                res.redirect('/auth/new')
                return;
            } else {
                myEventEmitter.emit('event', 'auth.post /new', 'INFO', `New account created.`);
                req.session.status = 'New account created, please login.'
                res.redirect('/auth');
                return;
            }
        } else {
            if(DEBUG) console.log('Not enough form fields completed.');
            req.session.status = 'Not enough form fields completed.'
            res.redirect('/auth/new')
            return;
        }       
    } catch (error) {
        console.log(error);
        // log this error to an error log file.
        res.render('503');
        return;
    }
});

// clear the session
router.get('/exit', async (req, res) => {
    if(DEBUG) console.log('get /exit');
    // clear out the express-session
    req.session.destroy((err) => {
        if (err) {
            // Handle error case
            console.error("Session destruction error:", err);
            return res.status(500).send("Could not log out.");
        } else {
            // Redirect to home page or login page after successful logout
            res.redirect('/');
            return;
        }
    });
});

module.exports = router;