import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'QuizTopic'
    },
    questions: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'Questions'
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },

    result: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Result',
        },
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Quiz', QuizSchema);