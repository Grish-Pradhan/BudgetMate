

// Get all transactions for logged-in user
const getTransactions = async (req, res) => {
    try {
        const userId = req.user.id;
        const transactions = await Transaction.findAll({ where: { user_id: userId } });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
};

// Add a transaction (income or expense) for logged-in user
const addTransaction = async (req, res) => {
    try {
        const { description, amount, type } = req.body;
        const userId = req.user.id;

        if (!description || !amount || !type) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const transaction = await Transaction.create({ description, amount, type, user_id: userId });
        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
};

// Delete a transaction by id for logged-in user
const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const deleted = await Transaction.destroy({ where: { id, user_id: userId } });

        if (deleted) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
};

// Get summary report grouped by type for logged-in user
const getReport = async (req, res) => {
    try {
        const userId = req.user.id;
        const report = await Transaction.findAll({
            where: { user_id: userId },
            attributes: [
                'type',
                [Transaction.sequelize.fn('SUM', Transaction.sequelize.col('amount')), 'total']
            ],
            group: ['type']
        });
        res.json(report);
    } catch (err) {
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
};

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction,
    getReport
};
