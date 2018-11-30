const express = require('express');
const router = express.Router();
const passport = require('../auth/passport');
const jws = require('jsonwebtoken');
const dbAccess = require('../helpers/dbAccess');
const config = require('../helpers/config');

router.post('/login', function (req, res, next) {
    dbAccess.findUser(req.body.name).then((result) => {
            if (req.body.password === result.users_password) {
                var user = {
                    user: result.users_username,
                    id: result.users_id,
                    type: result.type_users_id
                }
                const token = jws.sign(user, config.secretOrKey, {expiresIn: 180});
                res.json({status: 200, name: result.users_name, token: token});
            }else{
                res.json({status: 401, message:"Incorrect Password"});
            }
    }).catch((err) => {
        console.log(err);
        res.json({status: 404, message:"Incorrect Username"});
    });
});

module.exports = router;