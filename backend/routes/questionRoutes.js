const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const authMiddleware = require('../middlewares/authMiddleware');

// Add a question to a quiz (Admin only)
router.post(
  '/:quizId',
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  questionController.addQuestion
);

// Get all questions for a specific quiz
router.get('/:quizId', questionController.getQuestionsByQuiz);

// Update a question (Admin only)
router.put(
  '/:id',
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  questionController.updateQuestion
);

// Delete a question (Admin only)
router.delete(
  '/:id',
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  questionController.deleteQuestion
);

module.exports = router;
