import quizModel from "../models/quizModel.js";
import quizTopicModel  from '../models/quizTopicModel.js';
import { QuestionModel } from '../models/questionModel.js';
import mongoose from "mongoose";

const getQuizCategoryList = async (req, res) => {
    try {

        let quizCategoryList = await quizModel.distinct('category');

        res.status(200).json(quizCategoryList)

    } catch (err) {

        res.status(404).json({ message: "Something went wrong..!!", err })
    }
}

const createQuiz = async (req, res) => {

    console.log("inside create quiz")

    const { topic } = req.body
    try {
        // Sanity check
        const quizTopic = await quizTopicModel.findOne({ name: topic });

        if (!quizTopic) {
            return res.status(404).json({ error: 'Topic not found' });
        }

        // fetch random 5 question
        const questions = await QuestionModel.aggregate([
            { $match: { topic: new mongoose.Types.ObjectId(quizTopic._id) } },
            { $sample: { size: 5 } },
        ]);

        // create quiz
        const quizData = {
            title: `${topic} quiz`,
            description: `${topic} descriptions`,
            topic: quizTopic._id,
            questions: questions.map((question) => question._id),
        };

        const quiz = await quizModel.create(quizData);

        res.status(201).json(quiz._id);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const fetchQuizById = async(req, res) => {
    const {id} = req.params;
    try{
        console.log("quiz id: ", id)
        const resultedQuiz =  await quizModel.findById(id).populate("questions")
        console.log("resultedQuiz: ", resultedQuiz)
        res.status(200).json(resultedQuiz);
    }catch(error) {
        res.status(500).json({ error: 'Internal server error' });
    }

    
}

const deleteQuiz = async (req, res) => {
    const quizId = req.body.id
    try {
        const deletedQuiz = quizModel.findByIdAndRemove(quizId);

        if (deletedQuiz) {
            return res.status(200).json({ message: 'Quiz deleted successfully!.' });
        }
    } catch (err) {
        return res.status(404).json({ message: 'oops! error in deleting question.' });
    }
}

const evaluateResult = async(req, res) => {
    try {
        const { quizId, responses } = req.body;
        const quiz = await quizModel.findById(quizId).populate('questions');
        if (!quiz) {
          return res.status(404).json({ message: 'Quiz not found' });
        }
    
        const totalQuestions = quiz.questions.length;
        let correctAnswers = 0;
    
        // Evaluate each response and calculate the score
        for (let i = 0; i < totalQuestions; i++) {
          const question = quiz.questions[i];
          const correctOptionIndex = question.correctAnswer;

          const userResponseIndex = JSON.parse(responses)[i];
     
          if (correctOptionIndex == userResponseIndex) {
            correctAnswers++;
          }
        }
    
        const score = (correctAnswers / totalQuestions) * 100;
    
        res.json({ score: score, totalQuestions: totalQuestions });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
}

const quizService = {
    getQuizCategoryList,
    createQuiz,
    fetchQuizById,
    evaluateResult
}

export default quizService