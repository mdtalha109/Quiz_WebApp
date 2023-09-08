import ResultModel from '../models/resultModel.js'

const getResultById = async (req, res) => {
  const resultId = req.params.id
  try {
    const result = await ResultModel
      .findById(resultId)
      .populate({
        path: 'quiz',
        populate: {
          path: 'questions',
        },
      });

    if (!result) {
      throw new Error('Result not found');
    }

    let finalObj = {
      quizId : result.quiz._id,
      quizSummary: [],
      score : result.score
    }

    const questions = result.quiz.questions;
    const chosenAnswer = result.selectedAnswer;

    questions.map((question_item, index) => {
      let isCorrect = 'Incorrect';
      if(question_item.correctAnswer == chosenAnswer[index]){
        isCorrect = 'Correct';
        
      }
      let obj = {
        question: question_item.question,
        correctAnswer: question_item.correctAnswer,
        selectedAnswer: chosenAnswer[index],
        isCorrect: isCorrect
      }
      finalObj.quizSummary.push(obj)
    })

    res.status(200).json(finalObj)
  } catch (error) {
    throw error; //
  }
};

const resultService = {
  getResultById
}

export default resultService