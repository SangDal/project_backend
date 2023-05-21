import bcrypt from 'bcrypt';
import * as adminRepository from '../data/admin.js';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';



export async function login(req, res, next){
    const { userid, password } = req.body;

        // MySQL에서 사용자 정보를 조회합니다.
    const result = await adminRepository.login(userid, password);
    if(!result){
        return res.status(401).json({ error: 'Invalid userid or password' });
    }
    
    const token = createJwtToken(result.userid);
    return res.status(200).json({ token, userid });
}

// 토큰 인증방식 
export async function me (req, res, next){
    const user = await adminRepository.findById(req.userid);
    if(!user){
        return res.status(404).json({ message:'사용자가 존재하지 않음'});
    }
    res.status(200).json({ token: req.token, username: user.username});
}


function createJwtToken(userid) {
    return jwt.sign({userid}, config.jwt.secretKey, {expiresIn: config.jwt.expiresInSec})
}
