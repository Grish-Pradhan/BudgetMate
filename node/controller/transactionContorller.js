const { Transaction } = require('../model/transaction'); // Assuming Transaction model is defined

exports.getTransactions = async (req, res) => {
    try {
        const userId = req.user.id;
        const transactions = await Transaction.findAll({ where: { user_id: userId } });
        res.json(transactions);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.addTransaction = async (req, res) => {
    try {
        const { title, amount, type } = req.body;
        const userId = req.user.id;
        const transaction = await Transaction.create({ title, amount, type, user_id: userId });
        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const deleted = await Transaction.destroy({ where: { id, user_id: userId } });
        if (deleted) {
            res.sendStatus(204);
        } else {
            res.status(404).send('Transaction not found');
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getReport = async (req, res) => {
    try {
        const userId = req.user.id;
        const report = await Transaction.findAll({
            where: { user_id: userId },
            attributes: ['type', [Transaction.sequelize.fn('SUM', Transaction.sequelize.col('amount')), 'total']],
            group: ['type']
        });
        res.json(report);
    } catch (err) {
        res.status(500).send(err);
    }
};
