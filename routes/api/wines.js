const express = require('express');
const router = express.Router();
const wineController = require('../../controllers/wineController');
const authController = require('../../controllers/authController');

router.get('/', authController.ensureAuthenticated, (req, res) => {
  console.log('GET request to /wines');
  wineController.getAllWines(req, res);
});

router.post('/add', authController.ensureAdmin, (req, res) => {
  console.log('POST request to /wines/add');
  wineController.addWine(req, res);
});

router.post('/update', authController.ensureAdmin, (req, res) => {
  console.log('POST request to /wines/update');
  wineController.updateWine(req, res);
});

router.post('/delete', authController.ensureAdmin, (req, res) => {
  console.log('POST request to /wines/delete');
  wineController.deleteWine(req, res);
});

module.exports = router;

