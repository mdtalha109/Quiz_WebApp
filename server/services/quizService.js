import quizModel from "../models/quizModel.js";

const createQuiz = async(req, res) => {
    const {title, description, category, questions} = req.body
    try {
        const createdQuiz = await quizModel.create({
            title,
            description,
            category,
            questions : JSON.parse(questions)
        });

        if(createdQuiz){
            res.status(201).json({message: "Quiz created successfully"})
        }
    } catch (error) {
            res.status(404).json({message: "Something went wrong..", error})
    }
}

const quizService = {
    createQuiz
}

export default quizService