import quizService from "../services/quizService.js";

const getQuizCategoryList = async(req, res) => {
    return quizService.getQuizCategoryList(req, res)
}

const createQuiz = async(req, res) => {
    return quizService.createQuiz(req, res)
}

const fetchQuizById = async(req, res) => {
    return quizService.fetchQuizById(req, res)
}

const deleteQuiz = async(req, res) => {
    return quizService.deleteQuiz(req, res)
}

const evaluateResult = async(req, res) => {
    return quizService.evaluateResult(req, res)
}

const getAllQuizzes = async(req, res) => {
    return quizService.getAllQuizzes(req, res);
}

const allQuizByUser = async(req, res) => {
    return quizService.allQuizByUser(req, res)
}

export const quizController = {
    getQuizCategoryList,
    createQuiz,
    deleteQuiz,
    fetchQuizById,
    evaluateResult,
    getAllQuizzes,
    allQuizByUser
}