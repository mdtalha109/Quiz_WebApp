import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
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
  totalQuestions: {
    type: Number,
    required: true,
  },
  selectedAnswer: {
    type: [String],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ResultModel = mongoose.model('Result', ResultSchema);

export default ResultModel;
