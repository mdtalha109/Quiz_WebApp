import express from 'express';
import { questionController } from '../controllers/index.js';

const router = express.Router();

router.get('/:id', questionController.getQuestions);
router.post('/', questionController.insertQuestions);
router.delete('/:id', questionController.deleteQuestion);
router.post('/get-topic-question', questionController.getQuestionByTopic)

export default router;
