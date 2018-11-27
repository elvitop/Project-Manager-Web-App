const db = require('./db');
const sql = require('./querys');
const querys = {
    findUser: (user, password) => {
        return new Promise((res, rej) => {
            db.one(sql.addUser, [user, password]).then((result) => {
                console.log(result);
                res(result);
            }).catch((err) => {
                console.log(err);
                rej(err);
            });
        })
    }
}

module.exports = querys;