require('dotenv').config(); // Ensure to load environment variables
const { fullTextSearch: mongoFullTextSearch } = require('../services/m.wine.dal');
const { fullTextSearch: postgresFullTextSearch } = require('../services/p.wine.dal');

// Test search string
const searchString = 'Cabernet';

// Function to test MongoDB full-text search
async function testMongoFullTextSearch() {
    console.log('Testing MongoDB Full-Text Search');
    try {
        const results = await mongoFullTextSearch(searchString);
        console.log('MongoDB Results:', results);
    } catch (err) {
        console.error('MongoDB Error:', err);
    }
}

// Function to test PostgreSQL full-text search
async function testPostgresFullTextSearch() {
    console.log('Testing PostgreSQL Full-Text Search');
    try {
        const results = await postgresFullTextSearch(searchString);
        console.log('PostgreSQL Results:', results);
    } catch (err) {
        console.error('PostgreSQL Error:', err);
    }
}

// Run both tests
async function runTests() {
    await testMongoFullTextSearch();
    await testPostgresFullTextSearch();
}

// Execute the test functions
runTests();
