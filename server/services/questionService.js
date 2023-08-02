import { QuestionModel } from '../models/questionModel.js';
import  quizTopicModel  from '../models/quizTopicModel.js';


/**
 * Get a question by its ID.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The Question object.
 */
const getQuestion = async (req, res) => {
  try {
    let questionId = req.params.id
    const question = await QuestionModel.findById(questionId);
    if (question) {
      return res.status(200).json(question)
    }
  } catch (error) {
    return res.status(404).json({ message: 'Question not found.' });
  }
};

/**
 * create new question.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The response object.
 */
const createQuestion = async (req, res) => {
  try {
    const question = new QuestionModel(questionData);
    const newQuestion = await question.save();

    if (newQuestion) {
      res.status(201).json({ message: 'Question created successfully' })
    }

  } catch (error) {
    return res.status(500).json({ message: 'Failed to create question.' });
  }
};

/**
 * Delete a question by its ID.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The response object.
 */
const deleteQuestion = async (req, res) => {
  const questionId = req.params.id; // Assuming the question ID is passed as a parameter in the request
  try {
    const deletedQuestion = await QuestionModel.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found.' });
    }

    return res.status(200).json({ message: 'Question deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete question.' });
  }
}

const getQuestionByTopic = async(req, res) => {

  try{
    const {topicName} = req.body

    console.log("topicName: ", topicName)

    const quizTopic = await quizTopicModel.find({name: topicName})
    if(!quizTopic){
      res.status(404).json({message: "this topic doesn't exit anymore "})
    }
    
    let quizTopicId = quizTopic[0]._id;
  
    let questions = await QuestionModel.find({topic: quizTopicId})

    res.status(200).json(questions)

  } catch(err){
    console.log("error in fetching question by topic")
  }
 

  
}

const questionService = {
  getQuestion,
  createQuestion,
  deleteQuestion,
  getQuestionByTopic
}

export default questionService;
