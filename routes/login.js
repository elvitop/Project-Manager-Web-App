const express = require('express');
const router = express.Router();
const passport = require('passport');
const jws = require('jsonwebtoken');
const querys = require('../helpers/dbAccess')

router.post('/user', function (req, res, next) {
    querys.findUser(req.body.name, req.body.password).then((user) => {
        const token = jws.sign(user, 'plusultra', {expiresIn: 300});
        console.log(token);
        res.status(200).json({user: user, token: token});
    }).catch((err) => {
        res.send(err)
    });
})



module.exports = router;