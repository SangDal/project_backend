import express from 'express';
import * as userController from '../controllers/user.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

// 로그인 
router.get('/', userController.getAll);// 정보 조회
router.post('/', userController.createUser);// 계정 추가
router.put('/:id', userController.updateUser);// 계정 수정
router.delete('/:id', userController.deleteUser);// 계정 삭제 

export default router;
