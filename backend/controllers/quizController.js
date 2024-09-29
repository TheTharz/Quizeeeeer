const Quiz = require('../models/Quiz');

// Create a new quiz (Admin only)
exports.createQuiz = async (req, res) => {
  try {
    const { title, description, timeLimit, maxAttempts } = req.body;
    const quiz = new Quiz({ title, description, timeLimit, maxAttempts });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all quizzes (for users and admins)
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('questions');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a quiz (Admin only)
exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const { title, description, timeLimit, maxAttempts } = req.body;
    if (title) quiz.title = title;
    if (description) quiz.description = description;
    if (timeLimit) quiz.timeLimit = timeLimit;
    if (maxAttempts) quiz.maxAttempts = maxAttempts;

    await quiz.save();
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a quiz (Admin only)
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    await quiz.remove();
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
