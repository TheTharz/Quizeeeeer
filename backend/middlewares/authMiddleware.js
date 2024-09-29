const jwt = require('jsonwebtoken');

// Middleware to verify the token
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  console.log(token);
  if (!token) return res.status(401).json({ message: 'Access Denied' });
  const tokenString = token.split(' ')[1]; // This extracts the token part
  try {
    const verified = jwt.verify(tokenString, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid Token' });
  }
};

// Middleware to check if user is admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access Denied: Admins only' });
  }
  next();
};
