import { db } from '../db/database.js';

export async function findByUsername(username) {
    return db.execute('select * from users where username=?', [username]).then((result) => result[0][0]);
}

export async function createUser(user){
    const {username, password, name, email, url } = user;
    return db.execute('insert into users(username, password, name, email, url) values (?, ?, ?, ?, ?)', [username, password, name, email, url]).then((result) => console.log(result[0].insertId));
}

export async function findById(userid){
    console.log("들어옴 findById");
    return db.execute('select userid from users where userid=?', [userid]).then((result) => result[0][0]);
}

export async function login(userid, password) {
    return db.execute('select * from admin where userid=? and password=?', [userid, password]).then((result) => result[0][0]);
}