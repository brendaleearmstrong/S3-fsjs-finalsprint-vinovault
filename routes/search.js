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
        myEventEmitter.emit('event', 'get /search', 'INFO', 'Loading search page data');
        console.log('Loading search page data');
        const countries = await pgDal.getDistinctCountries();
        const colors = await pgDal.getDistinctColors();
        const types = await pgDal.getDistinctTypes();
        const wineries = await pgDal.getDistinctWineries();

        console.log('Fetched data:', { countries, colors, types, wineries });
        myEventEmitter.emit('event', 'get /search', 'INFO', 'Search page data loaded', {
            resultCount: {
                countries: countries.length,
                colors: colors.length,
                types: types.length,
                wineries: wineries.length
            }
        });
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
        myEventEmitter.emit('event', 'get /search', 'ERROR', 'Error loading search page', { error: error.message });
        res.status(500).render('error', { error: 'An error occurred while loading the search page.' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { keyword, database } = req.body;
        myEventEmitter.emit('event', 'post /search', 'INFO', 'Search initiated', {
            keyword: keyword,
            database: database
        });
        console.log('Search request received:', { keyword, database });

        if (!keyword) {
            console.error('Keyword is null or empty');
            myEventEmitter.emit('event', 'post /search', 'ERROR', 'Search keyword is empty or null');
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
        myEventEmitter.emit('event', 'post /search', 'INFO', 'Search completed', {
            keyword: keyword,
            database: database,
            resultCount: theResults.length
        });
        res.json(theResults);
    } catch (error) {
        console.error('Error in search query:', error);
        myEventEmitter.emit('event', 'post /search', 'ERROR', 'Error in search query', {
            keyword: req.body.keyword,
            database: req.body.database,
            error: error.message
        });
        res.status(500).json({ error: 'An error occurred during the search.' });
    }
});

router.post('/filter', async (req, res) => {
    try {
        const { filterType, filterValue } = req.body;
        myEventEmitter.emit('event', 'post /search/filter', 'INFO', 'Filter applied', {
            filterType: filterType,
            filterValue: filterValue
        });
        console.log('Filter request received:', { filterType, filterValue });

        if (!filterType || !filterValue) {
            console.error('Filter type or value is null or empty');
            myEventEmitter.emit('event', 'post /search/filter', 'ERROR', 'Filter type or value is null or empty');
            return res.status(400).json({ error: 'Filter type and value are required' });
        }

        let theResults;
        switch (filterType) {
            case 'country':
                theResults = await pgDal.getWinesByCountry(filterValue);
                break;
            case 'color':
                theResults = await pgDal.getWinesByColor(filterValue);
                break;
            case 'type':
                theResults = await pgDal.getWinesByType(filterValue);
                break;
            default:
                myEventEmitter.emit('event', 'post /search/filter', 'ERROR', 'Invalid filter type', {
                    filterType: filterType
                });
                return res.status(400).json({ error: 'Invalid filter type' });
        }

        console.log(`Filter complete. Found ${theResults.length} results.`);
        myEventEmitter.emit('event', 'post /search/filter', 'INFO', 'Filter completed', {
            filterType: filterType,
            filterValue: filterValue,
            resultCount: theResults.length
        });
        res.json(theResults);
    } catch (error) {
        console.error('Error in filter query:', error);
        myEventEmitter.emit('event', 'post /search/filter', 'ERROR', 'Error in filter query', {
            filterType: req.body.filterType,
            filterValue: req.body.filterValue,
            error: error.message
        });
        res.status(500).json({ error: 'An error occurred during filtering.' });
    }
});

module.exports = router;