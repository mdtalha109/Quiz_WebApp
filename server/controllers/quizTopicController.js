import quizTopicService from "../services/quizTopicService.js"

const createQuizTopic = async(req, res) => {
    return quizTopicService.createQuizTopic(req, res)
}

const getQuizTopic = async(req, res) => {
    return quizTopicService.getQuizTopic(req, res)
}


export const quizTopicController = {
    createQuizTopic,
    getQuizTopic
}