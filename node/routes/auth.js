// routes/auth.js ✅ fixed version
const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');
const auth = require('../middleware/authMiddleware');

// Remove '/auth' prefix from route paths
router.post('/register', controller.createUser);
router.post('/login', controller.loginUser);
router.post('/logout', auth, controller.logoutUser);
router.delete('/user/:id', auth, controller.deleteUser);

module.exports = router;
