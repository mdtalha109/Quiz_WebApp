import express from 'express';

import questionRoute from './questionRoute.js';
import resultRoute from './resultRoute.js';
import quizRoute from './quizRoute.js';

const router = express.Router();

router.use('/question', questionRoute);
router.use('/result', resultRoute);
router.use('/quiz', quizRoute)

export default router;
