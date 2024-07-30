const pool = require('../config/pgdb');

// Get all wines
exports.getAllWines = (req, res) => {
  console.log('Fetching all wines');
  pool.query(`
    SELECT Wine.*, Winery.logo AS WineryLogo 
    FROM Wine 
    JOIN Winery ON Wine.WineryID = Winery.WineryID
  `, (err, result) => {
    if (err) {
      console.error('Error fetching wines:', err);
      res.status(500).send('Server Error');
    } else {
      res.render('wines', { wines: result.rows });
    }
  });
};

// Add a new wine (admin)
exports.addWine = (req, res) => {
  console.log('Adding a new wine');
  const { name, type, color, price, rating, description, wineryid } = req.body;
  pool.query(
    'INSERT INTO Wine (Name, Type, Color, Price, Rating, Description, WineryID) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [name, type, color, price, rating, description, wineryid],
    (err) => {
      if (err) {
        console.error('Error adding wine:', err);
        res.status(500).send('Server Error');
      } else {
        req.flash('success_msg', 'Wine added successfully');
        res.redirect('/admin');
      }
    }
  );
};

// Update a wine (admin)
exports.updateWine = (req, res) => {
  console.log('Updating a wine');
  const { wineid, name, type, color, price, rating, description, wineryid } = req.body;
  pool.query(
    'UPDATE Wine SET Name = $1, Type = $2, Color = $3, Price = $4, Rating = $5, Description = $6, WineryID = $7 WHERE WineID = $8',
    [name, type, color, price, rating, description, wineryid, wineid],
    (err) => {
      if (err) {
        console.error('Error updating wine:', err);
        res.status(500).send('Server Error');
      } else {
        req.flash('success_msg', 'Wine updated successfully');
        res.redirect('/admin');
      }
    }
  );
};

// Delete a wine (admin)
exports.deleteWine = (req, res) => {
  console.log('Deleting a wine');
  const { wineid } = req.body;
  pool.query('DELETE FROM Wine WHERE WineID = $1', [wineid], (err) => {
    if (err) {
      console.error('Error deleting wine:', err);
      res.status(500).send('Server Error');
    } else {
      req.flash('success_msg', 'Wine deleted successfully');
      res.redirect('/admin');
    }
  });
};
