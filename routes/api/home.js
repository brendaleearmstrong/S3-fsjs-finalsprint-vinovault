const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

router.get('/', (req, res) => {
  console.log('GET request to /');
  authController.getIndexPage(req, res);
});

module.exports = router;
