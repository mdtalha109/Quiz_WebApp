import quizTopicService from "../services/quizTopicService.js"

const createQuizTopic = async(req, res) => {
    return quizTopicService.createQuizTopic(req, res)
}

const getQuizTopic = async(req, res) => {
    return quizTopicService.getQuizTopic(req, res)
}

const deleteQuizTopic= async(req, res) => {
    return quizTopicService.deleteQuizTopic(req, res);
}

const updateQuizTopic = async(req, res) => {
    return quizTopicService.updateQuizTopic(req, res)
}


export const quizTopicController = {
    createQuizTopic,
    getQuizTopic,
    deleteQuizTopic,
    updateQuizTopic
}