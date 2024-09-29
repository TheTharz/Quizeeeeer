const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    attemptedAt: {
      type: Date,
      default: Date.now,
    },
    answers: [
      {
        question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        selectedAnswers: [String],
      },
    ],
  },
  { timestamps: true }
);

const Attempt = mongoose.model('Attempt', attemptSchema);
module.exports = Attempt;
