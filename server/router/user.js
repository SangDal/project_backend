import express from 'express';
import * as userController from '../controllers/user.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

// 로그인 
router.get('/', userController.getAll);
// router.get('/', isAuth, UserController.me);

export default router;