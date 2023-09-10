import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'QuizTopic'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  visibility: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});




export const QuestionModel = mongoose.model("Questions", QuestionSchema)
