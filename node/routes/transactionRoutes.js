const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactioncontorller'); 
const auth = require('../middleware/authMiddleware');

router.get('/', auth.verifyToken, transactionController.getTransactions);
router.post('/', auth.verifyToken, transactionController.addTransaction);
router.get('/totals', auth.verifyToken, transactionController.getTotals);

module.exports = router;
//Grish Pradhan