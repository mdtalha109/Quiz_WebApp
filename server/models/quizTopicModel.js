import mongoose from "mongoose";

const QuizTopicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

export default mongoose.model('QuizTopic', QuizTopicSchema);