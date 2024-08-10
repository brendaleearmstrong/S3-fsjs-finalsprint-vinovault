const Pool = require('pg').Pool
const pool = new Pool({
  user: 'vvadmin',
  host: 'localhost',
  database: 'vinovault',
  password: 'vinovaultpw',
  port: 5432,
});
module.exports = pool;