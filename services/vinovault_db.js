const Pool = require('pg').Pool
const pool = new Pool({
  user: 'vinovaultadmin',
  host: 'localhost',
  database: 'vinovault',
  password: 'vinovault2024',
  port: 5432,
});
module.exports = pool;