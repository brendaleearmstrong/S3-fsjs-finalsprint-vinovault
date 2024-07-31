// TestDBConnection.js

// Import the Pool class from the 'pg' module to manage PostgreSQL connections
const { Pool } = require('pg');

// Load environment variables from a .env file into process.env
require('dotenv').config();

// Create a new pool instance with the database connection configuration
const pool = new Pool({
  user: process.env.PG_USER,      // Database user
  host: process.env.PG_HOST,      // Database host
  database: process.env.PG_DATABASE, // Database name
  password: process.env.PG_PASSWORD, // Database user's password
  port: process.env.PG_PORT,      // Database port
});

// Function to test the PostgreSQL connection
const testPostgresConnection = async () => {
  try {
    // Attempt to connect to the PostgreSQL database
    const client = await pool.connect();
    console.log('Connected to the PostgreSQL database successfully');

    // Perform a simple query to verify the connection
    const res = await client.query('SELECT NOW()');
    console.log('PostgreSQL current time:', res.rows[0]);

    // Release the client back to the pool
    client.release();
  } catch (err) {
    // Log any connection errors
    console.error('PostgreSQL connection error:', err);
  }
};

// Call the testPostgresConnection function to test the database connection
testPostgresConnection();
