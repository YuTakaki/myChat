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
    console.log(req.params.id);
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
        .catch(() => res.send(false));
        
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
    const {firstName, lastName, username, email, bio} = req.body;
    const {userUsername, userEmail} = req.query;
    let errors = {
        username_err : '',
        email_err : '',
        password_err : '',
        retry_password_err : ''
    };
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
                if(Object.values(errors).every(val => val === '')){
                    User.findOne({username : userUsername})
                        .then(user => {
                            user.firstName = firstName;
                            user.lastName = lastName;
                            user.email = email;
                            user.username = username;
                            user.bio = bio;
                            user.save()
                                .then(user => res.send(user));
                        });
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

const seenMessage = (req, res) => {
    const {user_id} = req.body;
    console.log(req.params.id);
    User.findOne({_id : req.params.id})
        .then(user => {
            user.messages = user.messages.map(msg => {
                if(msg.user_id === user_id){
                    msg.seen = true
                }
                return msg;
            });
            user.save()
                .then(user => res.send(user));

        })
        .catch(() => console.log('smething went wrong'))

}

const deleteMessage = (req, res) => {
    const {id} = req.body;
    User.findOne({_id : req.params.id})
        .then(user => {
            user.messages = user.messages.filter(msg => msg._id.toString() !== id)
            user.save()
                .then(user => res.send(user));
        })
}

const deleteAccount = (req, res) => {
    const {password} = req.body;
    User.findOne({_id : req.params.id})
        .then(user => {
            bcrypt.compare(password, user.password, (err, isMatch) =>{
                console.log(isMatch);
                if('ismatch' + isMatch){
                    User.findOneAndRemove({_id : req.params.id})
                        .then(user => {
                            console.log(user);
                            res.send(true)
                        });
                }else{
                    res.send(false);
                }
            })

        });
}

const changePassword = (req, res) => {
    const {currentPassword, newPassword} = req.body;
    User.findOne({_id : req.params.id})
        .then(user => {
            bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
                if(isMatch){
                    bcrypt.genSalt(10, (err, salt) => {
                        if(err) throw err;
                        bcrypt.hash(newPassword, salt, (err, hash) => {
                            if(err) throw err;
                            user.password = hash;
                            user.save()
                                .then(user => res.send(user));
                        })
                    })
                }else{
                    res.send(false);
                }

            });
            
            
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
    updateImage,
    seenMessage,
    deleteMessage,
    deleteAccount,
    changePassword
}