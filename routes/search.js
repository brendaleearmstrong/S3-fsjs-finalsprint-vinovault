const express = require('express');
const router = express.Router();
const {setToken, authenticateJWT} = require('../services/auth');
const myEventEmitter = require('../services/logEvents.js');

const pDal = require('../services/p.fulltext.dal')
const mDal = require('../services/m.fulltext.dal')

// Use the setToken middleware to set the JWT token from the session
router.use(setToken);

// Protect all API routes with the authenticateJWT middleware
router.use(authenticateJWT);

router.get('/', async (req, res) => {
    const theResults = [];
    myEventEmitter.emit('event', 'app.get /search', 'INFO', 'search page (search.ejs) was displayed.');
    res.render('search', {status: req.session.status, theResults});
});

router.post('/', async (req, res) => {
    // const theResults = [
    //      {make:"Tesla",model:"Model 3",description:"Sleek, electric, eco-friendly sedan for a sustainable future."},
    //      {make:"Chevrolet",model:"Malibu",description:"Midsize sedan with sleek design and modern tech."}
    // ];
    let theResults = await mDal.getFullText(req.body.keyword); 
    myEventEmitter.emit('event', 'app.post /search', 'INFO', 'search page (search.ejs) was displayed.');
    res.render('search', {status: req.session.status, theResults});
});

module.exports = router;