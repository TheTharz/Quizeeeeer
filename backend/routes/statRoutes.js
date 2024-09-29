const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get stats for a specific user
router.get(
  '/:userId',
  authMiddleware.verifyToken,
  statsController.getUserStats
);

module.exports = router;
