const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    questionText: {
      type: String,
      required: true,
    },
    options: [String], // List of possible answers
    correctAnswers: [String], // List of correct answers
  },
  { timestamps: true }
);

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
