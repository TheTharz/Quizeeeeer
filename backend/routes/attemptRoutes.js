const express = require('express');
const router = express.Router();
const attemptController = require('../controllers/attemptController');
const authMiddleware = require('../middlewares/authMiddleware');

// Start a quiz attempt (User)
router.post(
  '/:quizId',
  authMiddleware.verifyToken,
  attemptController.startQuizAttempt
);

// Get all attempts for a user
router.get(
  '/user/:userId',
  authMiddleware.verifyToken,
  attemptController.getUserAttempts
);

// Get attempt details by attempt ID
router.get(
  '/:attemptId',
  authMiddleware.verifyToken,
  attemptController.getAttemptById
);

module.exports = router;
