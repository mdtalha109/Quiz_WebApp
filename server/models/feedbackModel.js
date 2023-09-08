// Import necessary modules
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true, 
  },
  message: {
    type: String,
    required: true, 
  },
  timestamp: {
    type: Date,
    default: Date.now, 
  },
});

feedbackSchema.pre('save', function (next) {
    this.message = this.message.trim();
    next();
  });


export const Feedback = mongoose.model('Feedback', feedbackSchema);

