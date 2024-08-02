const { Client } = require('pg');

// Define your database configuration
const client = new Client({
  user: 'vinovaultadmin',
  host: 'localhost',
  database: 'vinovault',
  password: 'vinovault2024',
  port: 5432, // default PostgreSQL port
});

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to the database');

    // Example query to pull data from a table named 'users'
    const query = 'SELECT * FROM wine';

    return client.query(query);
  })
  .then(res => {
    console.log('Data:', res.rows);
  })
  .catch(err => {
    console.error('Error executing query', err.stack);
  })
  .finally(() => {
    client.end();
  });
