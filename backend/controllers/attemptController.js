const Attempt = require('../models/Attempt');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

// Start a quiz attempt (with result calculation)
exports.startQuizAttempt = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body; // answers should be in the format [{questionId: ..., selectedAnswers: [...]}]

    const quiz = await Quiz.findById(quizId).populate('questions');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let score = 0;
    let totalQuestions = quiz.questions.length;

    // Loop through the questions to calculate the score
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      const question = await Question.findById(answer.questionId);

      if (!question) continue; // If the question doesn't exist, skip

      // Check if the selected answers match the correct answers
      const isCorrect =
        question.correctAnswers.length === answer.selectedAnswers.length &&
        question.correctAnswers.every((val) =>
          answer.selectedAnswers.includes(val)
        );

      if (isCorrect) {
        score++; // Increment score for each correct answer
      }
    }

    const attempt = new Attempt({
      user: req.user.id,
      quiz: quizId,
      score, // Save the calculated score
      answers,
    });

    await attempt.save();

    res.status(201).json({
      message: 'Quiz attempt submitted successfully',
      attempt: {
        quizId,
        score,
        totalQuestions,
        correctAnswers: score,
        wrongAnswers: totalQuestions - score,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all attempts for a user
exports.getUserAttempts = async (req, res) => {
  try {
    const { userId } = req.params;
    const attempts = await Attempt.find({ user: userId }).populate('quiz');
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get attempt details by ID
exports.getAttemptById = async (req, res) => {
  try {
    const { attemptId } = req.params;
    const attempt = await Attempt.findById(attemptId).populate('quiz');
    if (!attempt) return res.status(404).json({ message: 'Attempt not found' });
    res.json(attempt);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
