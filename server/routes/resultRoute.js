import express from 'express';
import { resultController } from '../controllers/index.js';


const router = express.Router();

// router.get('/', resultController.getResult);
router.get('/:id', resultController.getResultById)


export default router;
