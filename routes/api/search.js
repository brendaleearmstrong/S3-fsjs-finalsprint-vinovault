const express = require('express');
const router = express.Router();
const searchController = require('../../controllers/searchController');
const authController = require('../../controllers/authController');

router.post('/', authController.ensureAuthenticated, (req, res) => {
  console.log('POST request to /search');
  searchController.searchWines(req, res);
});

module.exports = router;
