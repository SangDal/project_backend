import { db } from '../db/database.js';

export async function getAll() {
    return db.execute('select userid, username, hp, guardianHp, guardianHp2 from user').then((result) => result[0]);
}