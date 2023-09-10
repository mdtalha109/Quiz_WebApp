import express from 'express';
import { questionController } from '../controllers/index.js';
import authenticateUser from '../middleware/auth.js'

const router = express.Router();

router.get('/', authenticateUser, questionController.getAllQuestions);
router.post('/', authenticateUser, questionController.insertQuestions);
router.delete('/:id', questionController.deleteQuestion);
router.put('/:id', questionController.updateQuestion)
router.post('/get-topic-question', questionController.getQuestionByTopic)
export default router;
