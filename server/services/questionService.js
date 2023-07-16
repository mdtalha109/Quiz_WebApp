import { QuestionModel } from '../models/questionModel.js';

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

const questionService = {
  getQuestion,
  createQuestion,
  deleteQuestion
}

export default questionService;
