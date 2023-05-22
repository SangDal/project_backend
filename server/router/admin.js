import express from 'express';
import * as adminController from '../controllers/adminController.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

// 로그인 
router.post('/login', adminController.login);
router.get('/me', isAuth, adminController.me);

// 게시판
router.get('/board', adminController.createlist)
router.get('/board-read1', adminController.readBoard)
router.post('/html5-editor', adminController.newBoard);
router.delete('/board-read1', adminController.deleteBoard)
router.delete('/board', adminController.deleteBoard)
router.get('/index', adminController.countMain)
export default router;


