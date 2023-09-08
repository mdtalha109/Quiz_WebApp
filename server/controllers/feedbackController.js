import feedbackService from "../services/feedbackService"

const createFeedback = async (req, res) => {
    return await feedbackService.createFeedback(req, res)
}

const getFeedback = async (req, res) => {
    return await feedbackService.getFeedback(req, res)
}

export const feedbackController = {
    createFeedback,
    getFeedback,
};