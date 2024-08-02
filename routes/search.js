const express = require('express');
const router = express.Router();
const { setToken, authenticateJWT } = require('../services/auth');
const myEventEmitter = require('../services/logEvents');
const pgDal = require('../services/p.fulltext.dal');
const mDal = require('../services/m.fulltext.dal');

// Use the setToken middleware to set the JWT token from the session
router.use(setToken);

// Protect all API routes with the authenticateJWT middleware
router.use(authenticateJWT);

router.get('/', async (req, res) => {
    try {
        const countries = await pgDal.getDistinctCountries();
        const colors = await pgDal.getDistinctColors();
        const types = await pgDal.getDistinctTypes();
        const wineries = await pgDal.getDistinctWineries();

        console.log('Fetched data:', { countries, colors, types, wineries });

        myEventEmitter.emit('event', 'app.get /search', 'INFO', 'search page (search.ejs) was displayed.');
        res.render('search', {
            status: req.session.status,
            user: req.session.user,
            countries,
            colors,
            types,
            wineries,
            theResults: []
        });
    } catch (error) {
        console.error('Error loading search page:', error);
        myEventEmitter.emit('event', 'app.get /search', 'ERROR', `Error loading search page: ${error.message}`);
        res.status(500).render('error', { error: 'An error occurred while loading the search page.' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { keyword, database } = req.body;
        console.log('Search request received:', { keyword, database });

        if (!keyword) {
            console.error('Keyword is null or empty');
            return res.status(400).json({ error: 'Search keyword is required' });
        }

        let theResults;
        if (database === 'postgres') {
            console.log('Calling PostgreSQL search with keyword:', keyword);
            theResults = await pgDal.getFullText(keyword);
        } else {
            console.log('Calling MongoDB search with keyword:', keyword);
            theResults = await mDal.getFullText(keyword);
        }

        console.log(`Search complete. Found ${theResults.length} results.`);
        myEventEmitter.emit('event', 'app.post /search', 'INFO', 'search results displayed.');
        res.json(theResults);
    } catch (error) {
        console.error('Error in search query:', error);
        myEventEmitter.emit('event', 'app.post /search', 'ERROR', `Error in search query: ${error.message}`);
        res.status(500).json({ error: 'An error occurred during the search.' });
    }
});

module.exports = router;
