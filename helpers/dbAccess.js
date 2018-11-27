const db = require('./db');
const querys = require('./querys');
const dbAccess = {
    loginUser: (user, password) => {
        return new Promise((res, rej) => {
            db.one(querys.loginUser, [user, password]).then((result) => {
                res(result);
            }).catch((err) => {
                console.log(err);
                rej(err);
            });
        })
    },
    findUser: (user) => {
        return new Promise((res, rej) => {
            db.one(querys.findUser, [user]).then((result) => {
                res(result);
            }).catch((err) => {
                console.log(err);
                rej(err);
            });
        })
    },
    createProject: (id, name, desc, status) => {
        return new Promise((res, rej) => {
            db.one(querys.createProject, [id, name, desc, status]).then((result) => {
                res(result);
            }).catch((err) => {
                console.log(err);
                rej(err);
            });
        })
    },
    deleteProject: (id, name) => {
        return new Promise((res, rej) => {
            db.none(querys.deleteProject, [id]).then((result) => {
                res(result);
            }).catch((err) => {
                console.log(err);
                rej(err);
            });
        })
    },
    adminDelete: (name) => {
        return new Promise((res, rej) => {
            db.none(querys.adminDelete, [name]).then((result) => {
                res(result);
            }).catch((err) => {
                console.log(err);
                rej(err);
            });
        })
    },
    get_myProjects: (id) => {
        return new Promise((res, rej) => {
            db.any(querys.get_myProjects, [id]).then((result) => {
                res(result);
            }).catch((err) => {
                console.log(err);
                rej(err);
            });
        })
    }
}

module.exports = dbAccess;