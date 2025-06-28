// routes/auth.js
const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');
const auth = require('../middleware/authMiddleware');

// Public routes
router.post('/register', controller.createUser); // Register user ko lagi
router.post('/login', controller.loginUser);     // Login user ko lagi

// Protected routes
router.post('/logout', auth.verifyToken, controller.logoutUser);  // Logout ko lagi
router.delete('/user/:id', auth.verifyToken, controller.deleteUser); // Delete user ko lagi
router.get('/user', auth.verifyToken, controller.getUser);          // Get current user ko lagi
router.put('/user', auth.verifyToken, controller.updateUser);       // Update user profile ko lagi

module.exports = router;
//Grish Pradhan