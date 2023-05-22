import { db } from '../db/database.js';

export async function findByUsername(username) {
    return db.execute('select * from user where username=?', [username]).then((result) => result[0][0]);
}

export async function createUser(user){
    const {username, password, name, email, url } = user;
    return db.execute('insert into user(username, password, name, email, url) values (?, ?, ?, ?, ?)', [username, password, name, email, url]).then((result) => console.log(result[0].insertId));
}

export async function findById(userid){
    console.log("들어옴 findById");
    return db.execute('select userid from users where userid=?', [userid]).then((result) => result[0][0]);
}

export async function login(userid, password) {
    return db.execute('select * from admin where userid=? and password=?', [userid, password]).then((result) => result[0][0]);

}

// 게시판 리스트 불러오기
 
export async function list(category) {
    if (category === '전체') {
        return db.execute('SELECT post_id, category, userid, title, DATE_FORMAT(created_At, \'%Y-%m-%d %H:%i:%s\') as created_At FROM board')
          .then((result) => result[0]);
    } else {
    return db.execute('SELECT post_id, category, userid, title, DATE_FORMAT(created_At, \'%Y-%m-%d %H:%i:%s\') as created_At FROM board WHERE category=?', [category])
    .then((result) => result[0])}
    // .then(result => console.log(result))
    // .catch(error => console.log(error));
}

// 게시판 글쓰기
export async function createBoard(category, title, content){   
    const userid = 'Admin'
    return db.execute('insert into board(userid, category, title, content) values (?, ?, ?, ?)', [userid, category, title, content])
    .then((result) => console.log(result[0]));
}

// 게시판 글 읽어오기
export async function read(post_id) {
    return db.execute('SELECT category, userid, title, content,DATE_FORMAT(created_At, \'%Y-%m-%d %H:%i:%s\') as created_At FROM board WHERE post_id=?', [post_id])
    .then((result) => result[0])
}
// 게시판 글 삭제하기
export async function deleteboard(post_id){
    return db.execute('delete from board where post_id=?', [post_id])
    .then((result) => console.log(result[0]))
}


// 메인 페이지에 카운팅하기
export async function count() {
    return db.execute('SELECT COUNT(*) AS count FROM user')
    .then((result) =>result[0][0].count)
    .catch(err => console.log(err))
}

