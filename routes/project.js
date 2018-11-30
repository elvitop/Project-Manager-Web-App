const express = require('express');
const router = express.Router();
const passport = require('../auth/passport');
const jws = require('jsonwebtoken');
const dbAccess = require('../helpers/dbAccess');
const config = require('../helpers/config');
const upload = require('../helpers/multer');

router.post('/Project', function (req, res, next) {
    passport.authenticate('auth', {session: false}, function (err, user, info) {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.json({status: 401, message: info.message});
        }
        if (user) {
            dbAccess.createProject(user.id, req.body.name, req.body.desc, req.body.status).then((result) => {
                res.json({status: 201, message: 'Project Created', project_id: result.project_id});
            }).catch((err) => {
                res.json({status: 500, message: 'An error ocurred trying create the project'});
            });
        }
    })(req, res, next);
})

router.get('/MyProjects', function (req, res, next) {
    passport.authenticate('auth', {session: false}, function (err, user, info) {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.json({status: 401, message: info.message});
        }
        if (user) {
            dbAccess.get_myProjects(user.id).then((result) => {
                res.json({status: 200, message: 'Projects Fetched', data: result});
            }).catch((err) => {
                res.json({status: 500, message: 'An error ocurred trying fetched the projects'});
            });
        }
    })(req, res, next);
})

router.put('/Project', function (req, res, next) {
    passport.authenticate('auth', {session: false}, function (err, user, info) {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.json({status: 401, message: info.message});
        }
        if (user) {
            dbAccess.updateProject(req.id).then((result) => {
                res.json({status: 200, message: 'Project updated', data:{id: req.id}});
            }).catch((err) => {
                res.json({status: 404, message: 'Project not found'});
            });
        }
    })(req, res, next);
});

router.delete('/Project', function (req, res, next) {
    passport.authenticate('auth', {session: false}, function (err, user, info) {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.json({status: 401, message: info.message});
        }
        if (user) {
            switch (user.type) {
                case 0:
                    dbAccess.deleteProject(user.id, req.body.name).then((result) => {
                        res.json({status: 200, message: 'Project deleted'});
                    }).catch((err) => {
                        res.json({status: 500, message:'An error ocurred trying to delete the project'});
                    });
                    break;
            
                case 1:
                    dbAccess.adminDelete(req.body.name).then((result) => {
                        res.json({status:200, message: 'Project deleted'});
                    }).catch((err) => {
                        res.json({status: 500, message: 'An error ocurred trying to delete the project'});
                    });
                    break;
            }
        }
    })(req, res, next);
});

router.get('/Project/:projectId', function (req, res, next) {
    let id = parseInt(req.params.projectId);
    dbAccess.get_Project(id).then((result) => {
        res.json({status: 200, message: 'Projects Fetched', data: result});
    }).catch((err) => {
        res.json({status: 500, message: 'An error ocurred trying fetched the projects'});
    });
});

router.get('/Search/:project_name', function (req, res, next) {
    let project_name = `%${req.params.project_name}%`;
    dbAccess.search(project_name).then((result) => {
        res.json({status: 200, message: 'Projects Fetched Correctly', data: result});
    }).catch((err) => {
        res.json({status: 404, message: 'No Projects Found'});
    });
});

router.get('/SearchAdmin/:project_name', function (req, res, next) {
    passport.authenticate('auth', {session: false}, function (err, user, info) {
        let project_name = `%${req.params.project_name}%`;
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.json({status: 401, message: info.message});
        }
        if (user) {
            if (user.type === 1) {
                dbAccess.search(project_name).then((result) => {
                    res.json({status: 200, message: 'Projects Fetched Correctly', data: result});
                }).catch((err) => {
                    res.json({status: 404, message: 'No Projects Found'});
                });
            } else {
                res.json({status: 401, message: 'Unauthorized'});
            }
        }
    })(req, res, next);
})

module.exports = router;