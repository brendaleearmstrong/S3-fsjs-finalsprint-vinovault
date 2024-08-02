const axios = require('axios');

// Define base URL
const baseURL = 'http://localhost:3000';

// Test MongoDB full-text search
async function testMongoFullTextSearch() {
    try {
        const response = await axios.get(`${baseURL}/api/full/m/Cabernet`);
        console.log('MongoDB Full-Text Search Results:', response.data);
    } catch (error) {
        console.error('Error in MongoDB Full-Text Search:', error.message);
    }
}

// Test PostgreSQL full-text search
async function testPostgresFullTextSearch() {
    try {
        const response = await axios.get(`${baseURL}/api/full/p/Cabernet`);
        console.log('PostgreSQL Full-Text Search Results:', response.data);
    } catch (error) {
        console.error('Error in PostgreSQL Full-Text Search:', error.message);
    }
}

// Run tests
async function runTests() {
    await testMongoFullTextSearch();
    await testPostgresFullTextSearch();
}

runTests();
