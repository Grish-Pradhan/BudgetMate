const express = require('express');
const router = express.Router();
const User = require('../model/usermodel');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// Admin route to get all users
router.get('/users', verifyToken, verifyAdmin, async (_req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'createdAt'],
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Admin route to delete user by ID
router.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
//Grish Pradhan