const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt')

module.exports = (passport) => {
    passport.use(new localStrategy((username, password, done) => {
        User.findOne({$or : [{username}, {email : username}]})
            .then(user => {
                if(!user)  return done(null, false, {msg: 'username doesnt exist'});
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(!isMatch) return done(null, false, {msg: 'wrong password'});
                    return done(null, user);
                })
            })
            .catch(err => console.log(err));

    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => done(null, user))
    });
}