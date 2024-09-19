const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');

// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login);

router.post('/order', orderController.order);

module.exports = router;
