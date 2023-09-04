import express from 'express';
import { quizController, quizTopicController } from '../controllers/index.js';
import authenticateUser from '../middleware/auth.js';

const router = express.Router();


router.get('/', quizController.getQuizCategoryList); 
router.post('/', authenticateUser, quizController.createQuiz);
router.post('/get-quiz/:id', quizController.fetchQuizById)
router.post('/create-topic', quizTopicController.createQuizTopic)
router.get('/get-topic', quizTopicController.getQuizTopic)
router.post('/update-topic', quizTopicController.updateQuizTopic)
router.delete('/delete-topic', quizTopicController.deleteQuizTopic)
router.post('/calculate-result',authenticateUser, quizController.evaluateResult)
router.get('/all-quiz', quizController.getAllQuizzes)
router.get('/user',authenticateUser, quizController.allQuizByUser)



export default router;
