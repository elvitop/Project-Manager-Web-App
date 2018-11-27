const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const querys = require('./dbAccess');

module.exports = new LocalStrategy({
    usernameField : 'name',
    passwordField: 'password'
}, function (name, password, done) {
    console.log(name);
    
    querys.findUser(name, password).then((user) => {
        if (user.err) {
            console.log('Incorrect User or Password!');
            return done(null, false, {message: 'Incorrect User or Password!'});
        }else{
            return done(null, user, {message: 'Logged In Successfully!'});
        }
    }).catch((err) => {
        return done(err);
    });
}
);