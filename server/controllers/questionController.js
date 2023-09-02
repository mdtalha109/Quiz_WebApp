import questionService from "../services/questionService.js";

const getAllQuestions = async (req, res) => {
    return await questionService.getAllQuestions(req, res)
}

const insertQuestions = async (req, res) => {
    return await questionService.createQuestion(req, res)
}

const deleteQuestion = async (req, res) => {
    return await questionService.deleteQuestion(req, res)
}

const getQuestionByTopic = async(req, res) => {
    return await questionService.getQuestionByTopic(req, res)
}

const updateQuestion = async(req, res) => {
    return await questionService.updateQuestion(req, res)
}


export const questionController = {
    getAllQuestions,
    insertQuestions,
    deleteQuestion,
    getQuestionByTopic,
    updateQuestion
};