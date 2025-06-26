const express = require('express');
const router = express.Router();
const controller = require('../controller/userController'); // adjust path if needed
const auth = require('../middleware/authMiddleware'); // adjust path if needed

router.post('/register', controller.createUser);
router.post('/login', controller.loginUser);
router.post('/logout', auth.verifyToken, controller.logoutUser);
router.delete('/user/:id', auth.verifyToken, controller.deleteUser);

module.exports = router;
