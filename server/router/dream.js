import express from 'express';
import { login, register, checkUserId, updateUser, deleteUser } from '../controllers/userController.js'; // 여기에 updateUser, deleteUser 추가

const router = express.Router();

router.post('/login', login); // 로그인
router.post('/register', register); // 회원 가입
router.get('/check', checkUserId); // 아이디 중복 체크
router.put('/update', updateUser); // 회원 정보 수정
router.delete('/:userid', deleteUser); // 회원 삭제

export default router;
