const pool = require('../config/pgdb');

// Search wines
exports.searchWines = (req, res) => {
  console.log('Searching wines');
  const { query } = req.body;
  pool.query(`
    SELECT Wine.*, Winery.logo AS WineryLogo 
    FROM Wine 
    JOIN Winery ON Wine.WineryID = Winery.WineryID 
    WHERE Wine.Name ILIKE $1 OR Wine.Type ILIKE $1 OR Wine.Description ILIKE $1
  `, [`%${query}%`], (err, result) => {
    if (err) {
      console.error('Error searching wines:', err);
      res.status(500).send('Server Error');
    } else {
      res.render('searchResults', { wines: result.rows });
    }
  });
};
