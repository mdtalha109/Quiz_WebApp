import quizModel from "../models/quizModel.js";
import quizTopicModel  from '../models/quizTopicModel.js';
import { QuestionModel } from '../models/questionModel.js';
import ResultModel from '../models/resultModel.js';
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

    const { topic } = req.body

    const createdByUserId = req.user;
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
            createdBy: createdByUserId
        };

        const quiz = await quizModel.create(quizData);

        res.status(201).json(quiz._id);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error1' });
    }
}

const fetchQuizById = async(req, res) => {
    const {id} = req.params;
    try{
       
        const resultedQuiz =  await quizModel.findById(id).populate("questions")
       
        res.status(200).json(resultedQuiz);
    }catch(error) {
        res.status(500).json({ error: 'Internal server error2' });
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

const evaluateResult = async (req, res) => {
    try {
        let { quizId, responses } = req.body;
        const createdByUserId = req.user

        if(responses.length == 0){
            return res.status(404).json({ message: 'Something went wrong' });
        }

        const quiz = await quizModel.findById(quizId).populate('questions');
        let quizQuestions =  quiz.questions

        let quizArr = []

        quizQuestions.map((item, index) => {
            let quizObj = {}

            quizObj["question"] = item.question
            quizObj["correctAnswer"] = item.correctAnswer
            quizObj["selectedAnswer"] = responses[index]
            quizObj["status"] = (item.correctAnswer == responses[index]) ? 'Correct' : 'Incorrect'
            quizArr.push(quizObj)
            
        })
  
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        const totalQuestions = quiz.questions.length;
        let correctAnswers = 0;

        // Calculate the number of correct answers
        for (let i = 0; i < totalQuestions; i++) {
            const question = quiz.questions[i];
            const correctOptionIndex = question.correctAnswer;
            const userResponseIndex = responses[i];

            if (correctOptionIndex === userResponseIndex) {
                correctAnswers++;
            }
        }

        const score = (correctAnswers / totalQuestions) * 100;

        const result = new ResultModel({
            user: createdByUserId,
            quiz: quizId,
            score,
            totalQuestions,
            selectedAnswer: responses,
        });

        await result.save();
       
        res.json({ score, totalQuestions, quizArr });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const getAllQuizzes = async (req, res) => {
    try {
        // Fetch all quizzes
        const quizzes = await quizModel.find().populate('questions').populate('topic').populate('createdBy', '-password');

        res.status(200).json(quizzes);  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const allQuizByUser = async (req, res) => {
    const userId = req.user; 

    console.log('userId: ', userId)

    try {
        const quizzesAttemptedByUser = await ResultModel.find({ user: userId })
            .populate('quiz')
            .populate('quiz.questions')
            .populate('quiz.topic')
            .populate('quiz.createdBy', '-password');

        res.status(200).json(quizzesAttemptedByUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const quizService = {
    getQuizCategoryList,
    createQuiz,
    fetchQuizById,
    evaluateResult,
    getAllQuizzes,
    allQuizByUser
}

export default quizService