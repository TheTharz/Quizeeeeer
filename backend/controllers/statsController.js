const Attempt = require('../models/Attempt');

// Get stats for a specific user
exports.getUserStats = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch attempts and populate quiz details
    const attempts = await Attempt.find({ user: userId })
      .populate('quiz', 'title') // Only get the quiz title
      .sort({ createdAt: -1 }); // Sort attempts by the creation date (most recent first)

    if (!attempts || attempts.length === 0) {
      return res.status(404).json({ message: 'No attempts found' });
    }

    let totalScore = 0;
    attempts.forEach((attempt) => {
      totalScore += attempt.score;
    });

    const stats = {
      totalAttempts: attempts.length,
      totalScore,
      averageScore: totalScore / attempts.length,
      attempts: attempts.map((attempt) => ({
        quizTitle: attempt.quiz.title,
        score: attempt.score,
        createdAt: attempt.createdAt, // Assuming createdAt is available in your Attempt model
      })),
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
