const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/database');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {  // 'Income' or 'Expense' ko lagi ENUM use garne
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
  timeOfEntry: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
 userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'user_id',
  },
});

module.exports = Transaction;
//Grish Pradhan