const { Pool } = require('pg');
const pool = new Pool({
    user: 'vinovaultadmin',
    host: 'localhost',
    database: 'vinovault',
    password: 'vinovault2024',
    port: 5432,
});

const testDBConnection = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Database connection successful:', res.rows[0]);
    } catch (err) {
        console.error('Database connection error:', err);
    } finally {
        await pool.end();
    }
};

testDBConnection();