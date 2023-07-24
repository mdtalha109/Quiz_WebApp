import questionService from "../services/questionService.js";

const getQuestions = async (req, res) => {
    return await questionService.getQuestion(req, res)
}

const insertQuestions = async (req, res) => {
    const questionCreated = await questionService.createQuestion({
        question: "Inside which HTML element do we put the JavaScript?",
        options: ['<scripting>', '<javascript>', '<js>', '<script>'],
        correctAnswer: 'd',
        category: 'Javascript'
    })

    if (questionCreated) {
        res.json({ message: 'question added' })
    }
}

const deleteQuestion = async (req, res) => {
    return await questionService.deleteQuestion(req, res)
}

export const questionController = {
    getQuestions,
    insertQuestions,
    deleteQuestion
};