// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token from Authorization header.
 * If valid, attaches decoded user info to req.user.
 * If invalid or missing, responds with 401 Unauthorized.
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Extract token from header
  const token = authHeader.split(' ')[1];

  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request
    next(); // Proceed to next middleware/route handler
  } catch (error) {
    // Token verification failed
    return res.status(401).json({ message: 'Invalid token' });
  }
};

/**
 * Middleware to check if authenticated user is an admin.
 * If not admin, responds with 403 Forbidden.
 */
const verifyAdmin = (req, res, next) => {
  // Check if user role is 'admin'
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next(); // User is admin, proceed
};

module.exports = {
  verifyToken,
  verifyAdmin,
};
