const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new quiz (Admin only)
router.post(
  '/',
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  quizController.createQuiz
);

// Get all quizzes (for users and admins)
router.get('/', quizController.getAllQuizzes);

// Get a single quiz by ID (for users and admins)
router.get('/:id', quizController.getQuizById);

// Update a quiz (Admin only)
router.put(
  '/:id',
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  quizController.updateQuiz
);

// Delete a quiz (Admin only)
router.delete(
  '/:id',
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  quizController.deleteQuiz
);

module.exports = router;
