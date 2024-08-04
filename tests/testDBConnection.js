// testDBConnection.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'vinovaultadmin',
    host: 'localhost',
    database: 'vinovault',
    password: 'vinovault2024', // Ensure this is a string
    port: 5432,
});

async function testPostgresConnection() {
    try {
        const client = await pool.connect();
        console.log("PostgreSQL connected successfully.");
        client.release();
    } catch (err) {
        console.error("PostgreSQL connection error:", err);
    }
}

testPostgresConnection();
