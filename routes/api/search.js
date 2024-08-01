const express = require('express');
const router = express.Router();
const { fullTextSearch, filterSearch, colorSearch, typeSearch, winerySearch } = require('../../services/search.dal');

// Full-text search
router.post('/full-text', async (req, res) => {
    const { query } = req.body;
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
    const offset = (page - 1) * limit;

    try {
        const results = await fullTextSearch(query, limit, offset);
        res.render('search-results', { results, currentPage: page, status: req.session.status });
    } catch (error) {
        console.error('Full-text search error:', error);
        res.status(500).render('error', { error: 'An error occurred during the search.' });
    }
});

// Filter by country
router.post('/filter', async (req, res) => {
    const { country } = req.body;

    try {
        const results = await filterSearch(country);
        res.render('search-results', { results, status: req.session.status });
    } catch (error) {
        console.error('Filter search error:', error);
        res.status(500).render('error', { error: 'An error occurred during the search.' });
    }
});

// Search by color
router.post('/color', async (req, res) => {
    const { color } = req.body;

    try {
        const results = await colorSearch(color);
        res.render('search-results', { results, status: req.session.status });
    } catch (error) {
        console.error('Color search error:', error);
        res.status(500).render('error', { error: 'An error occurred during the search.' });
    }
});

// Search by type
router.post('/type', async (req, res) => {
    const { type } = req.body;

    try {
        const results = await typeSearch(type);
        res.render('search-results', { results, status: req.session.status });
    } catch (error) {
        console.error('Type search error:', error);
        res.status(500).render('error', { error: 'An error occurred during the search.' });
    }
});

// Search by winery
router.post('/winery', async (req, res) => {
    const { winery } = req.body;

    try {
        const results = await winerySearch(winery);
        res.render('search-results', { results, status: req.session.status });
    } catch (error) {
        console.error('Winery search error:', error);
        res.status(500).render('error', { error: 'An error occurred during the search.' });
    }
});

module.exports = router;
