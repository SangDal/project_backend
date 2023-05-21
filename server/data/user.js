import { db } from '../db/database.js';

export async function getAll() {
    return db.execute('select userid, username, guardianHp, guardianHp2, hp from user').then((result) => result[0]);
}

export async function getById(id) {
    return db.query('select userid, username, guardianHp, guardianHp2, hp from user WHERE userid = ?', [id]).then((result) => result[0][0])
}

export async function createUser(userid, username, password, guardianHp, guardianHp2, hp) {
    const query = 'INSERT INTO user (userid, username, password, guardianHp, guardianHp2, hp) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [userid, username, password, guardianHp, guardianHp2, hp];

    await db.query(query, values);
}

export async function update(userid, username, password, guardianHp, guardianHp2, hp) {
    const query = 'UPDATE user SET username = ?, guardianHp = ?, guardianHp2 = ?, hp = ? WHERE userid = ?';
    const values = [username, guardianHp, guardianHp2, hp, userid];

    await db.query(query, values);
}

export async function remove(userid) {
    const query = 'DELETE FROM user WHERE userid = ?';
    const values = [userid];

    await db.query(query, values);
}