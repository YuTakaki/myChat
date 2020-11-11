const User = require('../../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

const sign_up =  (req, res) => {
    const {firstName, lastName, username, email, password, retry_password} = req.body;
    let errors = {
        username_err : '',
        email_err : '',
        password_err : '',
        retry_password_err : ''
    };
    const encrypting = () => {
        bcrypt.genSalt(10, (err, salt)=>{
            if(err) throw err;
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) throw err;
                User.create({firstName, lastName, username, email, password : hash})
                    .then(user => res.send(user));
            })
        })
    }

    const usernameEmptyCheck = () => {
        User.findOne({username})
            .then(user => {
                if(user){
                    errors.username_err = 'Username already exist';
                }else{
                    if(username.length < 6) errors.username_err = 'Username should be 6 characters long';
                    const usernameTest = /^[a-zA-Z]+[\w]+/
                    if(!usernameTest.test(username)) errors.username_err = 'Username shouldn\'t have space, symbols and number in the first';
                };
                emailEmptyCheck();
            })
    }
    const emailEmptyCheck = () => {
        User.findOne({email})
            .then(user => {
                if(user){
                    errors.email_err = 'email already exist'
                }
                if(password.length < 8) errors.password_err = 'password should be atleast 8 long';
                if(password !== retry_password) errors.retry_password_err = 'retry password does not match password';
                if(Object.values(errors).every(val => val === '')){
                    encrypting();  
                }else{
                    res.send(errors);
                }
            })
    }
    usernameEmptyCheck();
}

const sign_in = (req, res, next) => {
    passport.authenticate('local', (err, user, info) =>{
        if(err) return next(err);
        if(!user) return res.send(info);
        req.logIn(user, (err) =>{
            if(err) return next(err);
            return res.redirect(`/dashboard/isAuth/${user.id}`);
        });
    })(req, res, next);
}

const logout =  (req, res) => {
    req.logout();
    res.send(true);
}

const offline = (req, res) => {
    User.findOne({_id : req.params.id})
        .then(user => {
            user.online = false;
            user.save();
        });
};

const online = (req, res) => {
    User.findOne({_id : req.params.id})
        .then(user => {
            user.online = true;
            user.save();
        });
};

module.exports = {
    sign_up,
    sign_in,
    logout,
    offline,
    online
}