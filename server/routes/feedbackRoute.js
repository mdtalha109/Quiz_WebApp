import express from 'express';
import { feedbackController } from '../controllers/feedbackController.js';
import authenticateUser from '../middleware/auth.js';

const router = express.Router();


router.post('/', authenticateUser, feedbackController.createFeedback); 
router.get('/', feedbackController.getFeedback); 



export default router;
