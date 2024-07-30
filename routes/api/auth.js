const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

router.post('/register', (req, res) => {
  console.log('POST request to /auth/register');
  authController.registerUser(req, res);
});

router.post('/login', (req, res, next) => {
  console.log('POST request to /auth/login');
  authController.loginUser(req, res, next);
});

router.get('/logout', (req, res) => {
  console.log('GET request to /auth/logout');
  authController.logoutUser(req, res);
});

module.exports = router;
