const User = require('../model/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register new user
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user with email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'User created successfully',
      user: { name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Sign JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Logout user (stateless JWT, so client deletes token)
const logoutUser = (_req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

// Delete user by id
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: 'User not found or already deleted' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = { createUser, loginUser, logoutUser, deleteUser };
