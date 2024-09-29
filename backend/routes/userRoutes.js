const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Register a new user
router.post('/register', userController.registerUser);

// Login user (Admin or User)
router.post('/login', userController.loginUser);

// Get user profile (requires authentication)
router.get(
  '/profile',
  authMiddleware.verifyToken,
  userController.getUserProfile
);

// Update user profile
router.put(
  '/profile',
  authMiddleware.verifyToken,
  userController.updateUserProfile
);

module.exports = router;
