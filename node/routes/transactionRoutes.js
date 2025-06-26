// routes/transactionRoutes.js

const express = require('express');
const router = express.Router();
const controller = require('../controller/transactionContorller'); 
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// Apply token verification middleware to all routes
router.use(verifyToken);

router.get('/', controller.getTransactions);
router.post('/', controller.addTransaction);

// Only admins can delete
router.delete('/:id', verifyAdmin, controller.deleteTransaction);

module.exports = router;
