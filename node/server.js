const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize, connectDB } = require('./db/database');
const authRoute = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const transactionRoutes = require('./routes/transactionRoutes');  // <-- import transaction routes

dotenv.config();

const app = express();

// Enable CORS for your frontend app (adjust origin accordingly)
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Middleware to parse incoming JSON requests
app.use(express.json());

// Register routes
app.use('/api/auth', authRoute);
app.use('/admin', adminRoutes); // Middleware checks inside admin.js
app.use('/api/transactions', transactionRoutes);  // <-- register transaction routes here

// Test routes
app.get('/', (_req, res) => res.send('Welcome to the Home Page'));
app.get('/about', (_req, res) => res.json({ name: 'Express Server' }));

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
