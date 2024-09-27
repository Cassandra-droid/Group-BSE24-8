import express from 'express';
import { signup, login } from '../controllers/authController.js'; 
import { order } from '../controllers/orderController.js'; 

const router = express.Router();

// Signup route
router.post('/signup', signup); 

// Login route
router.post('/login', login); 

// Order route
router.post('/order', order);

export default router; // Use export default to export the router
