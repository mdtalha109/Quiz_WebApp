import express from 'express';
import { quizController } from '../controllers/index.js';

const router = express.Router();


router.post('/', quizController.createQuiz);


export default router;
