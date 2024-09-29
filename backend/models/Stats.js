const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    totalQuizzes: {
      type: Number,
      default: 0,
    },
    totalScore: {
      type: Number,
      default: 0,
    },
    bestScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Stats = mongoose.model('Stats', statsSchema);
module.exports = Stats;
