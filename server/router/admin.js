import express from 'express';
import * as adminController from '../controllers/adminController.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

// 로그인 
router.post('/login', adminController.login);
router.get('/me', isAuth, adminController.me);

export default router;