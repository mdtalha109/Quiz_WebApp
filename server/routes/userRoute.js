import express from 'express';
import {userController} from '../controllers/userController.js'
import authenticateUser from '../middleware/auth.js';

const router = express.Router();

router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.put('/', authenticateUser, userController.updateUser)

export default router;
