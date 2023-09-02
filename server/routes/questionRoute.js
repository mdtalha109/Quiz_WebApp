import express from 'express';
import { questionController } from '../controllers/index.js';

const router = express.Router();

router.get('/', questionController.getAllQuestions);
router.post('/', questionController.insertQuestions);
router.delete('/:id', questionController.deleteQuestion);
router.put('/:id', questionController.updateQuestion)
router.post('/get-topic-question', questionController.getQuestionByTopic)

export default router;
