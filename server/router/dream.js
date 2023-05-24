import express from 'express';
import { login, register, checkUserId, updateUser, deleteUser } from '../controllers/userController.js'; // 여기에 updateUser, deleteUser 추가
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login); // 로그인
router.post('/register', register); // 회원 가입
router.get('/check', checkUserId); // 아이디 중복 체크
router.put('/update', isAuth, updateUser); // 회원 정보 수정
router.delete('/:userid', isAuth, deleteUser); // 회원 삭제

export default router;
