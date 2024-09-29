const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

// Add a question to a quiz (Admin only)
exports.addQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { questionText, options, correctAnswers } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const question = new Question({
      quiz: quizId,
      questionText,
      options,
      correctAnswers,
    });
    await question.save();

    quiz.questions.push(question._id);
    await quiz.save();

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all questions for a quiz
exports.getQuestionsByQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const questions = await Question.find({ quiz: quizId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a question (Admin only)
exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { questionText, options, correctAnswers } = req.body;

    const question = await Question.findById(id);
    if (!question)
      return res.status(404).json({ message: 'Question not found' });

    if (questionText) question.questionText = questionText;
    if (options) question.options = options;
    if (correctAnswers) question.correctAnswers = correctAnswers;

    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a question (Admin only)
exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    if (!question)
      return res.status(404).json({ message: 'Question not found' });

    await question.remove();
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
