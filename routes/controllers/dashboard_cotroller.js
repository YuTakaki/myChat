const User = require('../../models/user');
const bcrypt = require('bcrypt');

const getUserID = (req, res) => {
    User.findOne({_id : req.params.id})
        .then(user => {
            user.online = true;
            user.save()
                .then(()=> res.send(req.params.id));
        });
};

const getUserInfo = (req, res) => {
    User.findOne({_id : req.params.id})
        .then((user) => {
            
            res.send(user);
        })
}


const getUserInfo2 = (req, res) => {
    User.findOne({_id : req.params.id})
        .then((user) => {
            const {_id,username, profile, online} = user;
            const send = {
                _id,
                username,
                profile,
                online
            }
            
            res.send(send);
        })
}

const getUserMessages = (req, res) => {
    const {loginUser} = req.body;
    User.findOne({username : req.params.username})
        .then(user => {
            user.messages.forEach(messageUser => {
                if(messageUser.username === loginUser){
                    res.send(messageUser);
                }

            })
        })
}

const advanceSearch = (req, res) => {
    const {username} = req.body
    User.find()
        .then(users => {
            res.send(users.filter((user) => user._id.toString() !== req.params.id && user.username.startsWith(username)));
        });
}

const addToContact = (req, res) => {
    const {username, _id} = req.body
    User.findOne({_id : req.params.id})
        .then(user => {
            user.contacts.push({username, _id});
            user.save()
                .then(user => res.send(user));
        })
}
const deleteToContact = (req, res) => {
    const {username} = req.body;
    
    User.findOne({_id : req.params.id})
        .then(user => {
            user.contacts = user.contacts.filter(contact => contact.username !== username);
            user.save()
                .then(user => res.send(user));
        })
}

const editAccount = (req, res) => {
    const {firstName, lastName, username, email, password, retry_password, bio} = req.body;
    const {userUsername, userEmail} = req.query;
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
                User.findOne({username : userUsername})
                    .then(user => {
                        user.firstName = firstName;
                        user.lastName = lastName;
                        user.email = email;
                        user.username = username;
                        user.password = hash;
                        user.bio = bio;
                        user.save()
                            .then(user => res.send(user));
                    });
            })
        })
    }

    const usernameEmptyCheck = () => {
        User.findOne({username})
            .then(user => {
                if(user && user.username !== userUsername){
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
                if(user && user.email !== userEmail){
                    errors.email_err = 'email already exist'
                }
                if(password.length < 8) errors.password_err = 'password should be atleast 8 long';
                if(password !== retry_password) errors.retry_password_err = 'retry password does not match password';
                if(Object.values(errors).every(val => val === '')){
                    encrypting();  
                    console.log(errors);
                }else{
                    
                    res.send(errors);
                }
            })
    }
    usernameEmptyCheck();
}

const updateImage = (req, res) => {
    const {img} = req.body;
    console.log(img);
    User.findOne({_id : req.params.id})
        .then(user => {
            console.log(user);
            user.profile = img;
            user.save()
                .then(user => res.send(user));
        })

}

module.exports = {
    getUserID,
    advanceSearch,
    getUserInfo,
    addToContact,
    deleteToContact,
    getUserInfo2,
    editAccount,
    getUserMessages,
    updateImage
}