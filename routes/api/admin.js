const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController');
const authController = require('../../controllers/authController');

router.get('/', authController.ensureAdmin, (req, res) => {
  console.log('GET request to /admin');
  adminController.getAdminDashboard(req, res);
});

module.exports = router;
