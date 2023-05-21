import * as userRepository from "../data/user.js"
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export async function getAll(req, res, next){
    const users = await userRepository.getAll();
    console.log("데이터 뽑아감.");   
    return res.status(200).json(users);

    // const token = createJwtToken(result.userid);
    // return res.status(200).json({ token, userid });
}

// app.post('/users', (req, res) => {
export async function createUser(req, res, next){
    try {
        const { name, email, password } = req.body;
        const newUser = { id: users.length + 1, name, email, password };
        users.push(newUser);
        res.json({ message: '회원 정보가 추가되었습니다.' });
      } catch (error) {
        console.error('회원 정보를 추가하는 중 오류가 발생했습니다.', error);
        res.status(500).json({ error: '서버 오류' });
      }
}

// 회원 정보 수정
export async function updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
  
      const userIndex = users.findIndex((user) => user.id === parseInt(id));
      if (userIndex === -1) {
        return res.status(404).json({ error: '해당 회원을 찾을 수 없습니다.' });
      }
  
      const updatedUser = { ...users[userIndex], name, email, password };
      users[userIndex] = updatedUser;
  
      res.json({ message: '회원 정보가 수정되었습니다.' });
    } catch (error) {
      console.error('회원 정보를 수정하는 중 오류가 발생했습니다.', error);
      res.status(500).json({ error: '서버 오류' });
    }
  }
  // 회원 정보 삭제
  export async function deleteUser(req, res, next) {
    try {
      const { id } = req.params;
  
      const userIndex = users.findIndex((user) => user.id === parseInt(id));
      if (userIndex === -1) {
        return res.status(404).json({ error: '해당 회원을 찾을 수 없습니다.' });
      }
  
      users.splice(userIndex, 1);
  
      res.json({ message: '회원 정보가 삭제되었습니다.' });
    } catch (error) {
      console.error('회원 정보를 삭제하는 중 오류가 발생했습니다.', error);
      res.status(500).json({ error: '서버 오류' });
    }
  }