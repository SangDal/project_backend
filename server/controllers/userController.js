
import bcrypt from 'bcrypt';
import { config } from '../config.js';
import { db as pool } from '../db/database.js';




// 회원가입을 처리하는 새로운 함수
export const register = async (req, res) => {
    const { userid, username, password, guardianHp, hp } = req.body;
    try {
        const existUsers = await pool.query("SELECT * FROM user WHERE userid = ?", [userid]);
        if (existUsers[0].length > 0) {
            return res.status(400).json({
                message: "해당 아이디가 이미 존재합니다."
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounds);
        const newUser = await pool.query("INSERT INTO user ( userid, username, password, guardianHp, hp) VALUES (?, ?, ?, ?, ?)",
            [userid, username, hashedPassword, guardianHp, hp]);
        res.status(201).json({
            message: "성공적으로 등록되었습니다."
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "여기서 오류??"
        });
    }
};

// 아이디 중복
export async function checkUserId(req, res) {
    const userid = req.query.userid;
    if (!userid) {
        return res.status(400).json({message: '아이디를 입력해 주세요.'});
    }

    try {
        const [result] = await pool.query(`SELECT userid FROM user WHERE userid=?`, [userid]);
        if (result.length > 0) {
            return res.status(400).json({message: '이미 사용중인 아이디입니다.'});
        } else {
            return res.status(200).json({message: '사용 가능한 아이디입니다.'});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: '서버 오류'});
    }
}
// 로그인
export async function login(req, res) {
    const { userid, password } = req.body;
    const sql = 'SELECT * FROM user WHERE userid = ?';

    try {
        const [users] = await pool.query(sql, [userid]);
        if (users.length === 0) {
            return res.status(401).json({ message: '유효하지 않은 사용자 인증 정보' });
        }
        const user = users[0];
        // 여기서 로그를 출력하여 실제로 받아온 비밀번호와 DB에 저장된 비밀번호를 확인해보세요.
        console.log('Received password:', password);
        console.log('Stored password:', user.password);
        
        const validPassword = await bcrypt.compare(password, user.password);
        
        // validPassword 값도 출력해보면 좋겠습니다.
        console.log('Is password valid?', validPassword);
        
        if (!validPassword) {
            return res.status(401).json({ message: '유효하지 않은 사용자 인증 정보' });
        }

        res.status(200).json({ message: '로그인 성공' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
};

// g회원 정보 수정
export async function updateUser(req, res) {
    const { userid, password, username, hp, guardianHp } = req.body;

    try {
        // bcrypt를 사용해 새로운 비밀번호를 해시화
        const hashedPassword = await bcrypt.hash(password, 10);

        // DB에 업데이트 쿼리를 보냄
        const sql = `
            UPDATE user 
            SET password = ?, username = ?, hp = ?, guardianHp = ? WHERE userid = ?
        `;
        await pool.query(sql, [hashedPassword, username, hp, guardianHp,  userid]);

        res.status(200).json({ message: '회원 정보 수정 성공' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
}

export async function deleteUser(req, res) {
    const { userid } = req.params;

    try {
        // DB에서 해당 사용자를 삭제
        const sql = 'DELETE FROM user WHERE userid = ?';
        await pool.query(sql, [userid]);
        console.log(userid);

        res.status(200).json({ message: '회원 삭제 성공' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
}
