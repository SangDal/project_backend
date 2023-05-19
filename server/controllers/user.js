import * as userRepository from "../data/user.js"
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export async function getAll(req, res, next){
    const users = await userRepository.getAll();
    console.log(users);
    // const token = createJwtToken(result.userid);
    
    // return res.status(200).json({ token, userid });
    return res.status(200).json(users);
}