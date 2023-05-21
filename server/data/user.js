import { db } from '../db/database.js';

export async function getAll() {
    return db.execute('select userid, username, hp, guardianHp, guardianHp2 from user').then((result) => result[0]);
}

//트윗의 id를 뽑아서 확인하고 return 
export async function create(text, userId) {
    return db.execute('insert into tweets (text, createdAt, userId) values (?, ?, ?)', [text, new Date(), userId]).then((result) => console.log(result));
}

export async function update(id, text) {
    return db.execute('update tweets SET text=? where id=?', [text, id]).then(() => getById(id));
}

export async function remove(id) {
    return db.execute('delete from tweets where id=?', [id]);
}