const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secret = require('../helpers/config');
const dbAccess = require('../helpers/dbAccess');

let config = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret.secretOrKey
}

passport.use('auth', new JwtStrategy(config, function (jwt_payload, done) {
    dbAccess.findUser(jwt_payload.user).then((result) => {
            let user = jwt_payload;
            done(null, user);
    }).catch((err) => {
        done(err, false, {message: 'Incorrect Token'});
    });
}));


module.exports = passport;
