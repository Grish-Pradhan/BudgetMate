const Transaction = require('../model/transactionmodel');

// Get transactions for the logged-in user or all if admin
const getTransactions = async (req, res) => {
  try {
    console.log('User info from token:', req.user); 

    let whereClause = {};

    if (req.user.role !== 'admin') {
      // Normal user lai only their transactions
      whereClause.userId = req.user.id;
    }
    // Admin lai get all transactions

    const transactions = await Transaction.findAll({
      where: whereClause,
      order: [['timeOfEntry', 'DESC']],
    });

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

// Add new transaction
const addTransaction = async (req, res) => {
  try {
    const { type, description, amount } = req.body;

    if (!type || !description || amount == null) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber)) {
      return res.status(400).json({ error: 'Amount must be a valid number' });
    }

    if (!['Income', 'Expense'].includes(type)) {
      return res.status(400).json({ error: 'Type must be Income or Expense' });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized: missing user info' });
    }

    const transaction = await Transaction.create({
      type,
      description,
      amount: amountNumber,
      timeOfEntry: new Date(),
      userId: req.user.id,
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ error: 'Failed to add transaction' });
  }
};


const getTotals = async (req, res) => {
  try {
    let whereClause = {};

    if (req.user.role !== 'admin') {
      whereClause.userId = req.user.id;
    }

    const totals = await Transaction.findAll({
      attributes: [
        'type',
        [Transaction.sequelize.fn('SUM', Transaction.sequelize.col('amount')), 'total'],
      ],
      where: whereClause,
      group: ['type'],
    });

    const formatted = totals.map(t => ({
      type: t.type,
      total: parseFloat(t.dataValues.total),
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Error fetching totals:', error);
    res.status(500).json({ error: 'Failed to fetch totals' });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  getTotals,
};
//Grish Pradhan