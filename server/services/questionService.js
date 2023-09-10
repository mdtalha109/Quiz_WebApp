import { QuestionModel } from '../models/questionModel.js';
import  quizTopicModel  from '../models/quizTopicModel.js';
import User from '../models/userModel.js'


/**
 * Get a question by its ID.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The Question object.
 */
const getAllQuestions = async (req, res) => {
  try {

    const userId = req.user;
    const topicname = req.query.topic;
    const topic = await quizTopicModel.findOne({name:topicname})
    const topicId = topic?._id;
    const user = await User.findById(userId)
    if(!user){
      res.status(404).json({message: 'User not found'})
    }

    const query = {
      visibility : user.isAdmin == true ? 'private' : 'private',
      createdBy: userId
    }

    if(topicId){
      query.topic = topicId
    }


    const questions = await QuestionModel.find(query);
    console.log(questions)

    if (questions) {
      return res.status(200).json(questions)
    }
  } catch (error) {
    console.log('error: ', error)
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
  const { question, options, correctAnswer, topicName } = req.body;
  const userId = req.user

  try {
    const quizTopic = await quizTopicModel.findOne({ name: topicName });

    if (!quizTopic) {
      return res.status(404).json({ message: 'Quiz topic not found.' });
    }

    const user = User.findById(userId)
    let visibility = user.isAdmin == true ? 'public' : 'private'


    // Create the question
    const createdQuestion = await QuestionModel.create({
      question,
      options,
      correctAnswer,
      topic: quizTopic._id,
      createdBy: userId,
      visibility: visibility
    });

    return res.status(201).json(createdQuestion);
  } catch (error) {
    console.error('Error creating question:', error);
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
  const questionId = req.params.id; 
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

/**
 * Update question by its ID.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The response object.
 */
const updateQuestion = async (req, res) => {
  const questionId = req.params.id; 
  const { question, options, correctAnswer, topicName } = req.body;

  try {
    const quizTopic = await quizTopicModel.findOne({ name: topicName });

    if (!quizTopic) {
      return res.status(404).json({ message: 'Quiz topic not found.' });
    }

    const updatedQuestion = await QuestionModel.findByIdAndUpdate(
      questionId,
      {
        question,
        options,
        correctAnswer,
        topic: quizTopic._id,
      },
      { new: true } // Returns the updated document
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found.' });
    }

    return res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error('Error updating question:', error);
    return res.status(500).json({ message: 'Failed to update question.' });
  }
};


const questionService = {
  getAllQuestions,
  createQuestion,
  deleteQuestion,
  getQuestionByTopic,
  updateQuestion
}

export default questionService;
