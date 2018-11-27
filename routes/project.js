const express = require('express');
const router = express.Router();
const passport = require('../auth/passport');
const jws = require('jsonwebtoken');
const dbAccess = require('../helpers/dbAccess');
const config = require('../helpers/config');

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

router.get('/Project', function (req, res, next) {
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
})

module.exports = router;