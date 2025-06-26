const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize, connectDB } = require('./db/database');
const authRoute = require('./routes/auth');  // <-- Import routes here

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Use the auth routes for any endpoint that starts with /api/auth
app.use('/api/auth', authRoute);

app.get('/', (_req, res) => res.send('Welcome to the Home Page'));
app.get('/about', (_req, res) => res.json({ name: 'Express Server' }));

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
