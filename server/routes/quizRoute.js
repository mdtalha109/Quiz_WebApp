import express from 'express';
import { quizController, quizTopicController } from '../controllers/index.js';

const router = express.Router();


router.get('/', quizController.getQuizCategoryList); 
router.post('/', quizController.createQuiz);
router.post('/get-quiz/:id', quizController.fetchQuizById)
router.post('/create-topic', quizTopicController.createQuizTopic)
router.get('/get-topic', quizTopicController.getQuizTopic)
router.post('/calculate-result', quizController.evaluateResult)


export default router;
