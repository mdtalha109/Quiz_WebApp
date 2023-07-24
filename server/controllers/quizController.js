import quizService from "../services/quizService.js";

const createQuiz = async(req, res) => {
    return quizService.createQuiz(req, res)
}

const deleteQuiz = async(req, res) => {
    return quizService.
}

export const quizController = {
    createQuiz
}