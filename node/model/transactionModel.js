const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/database');

const Transaction = sequelize.define('Transaction', {
  type: {
    type: DataTypes.ENUM('Income', 'Expense'),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Transaction;
