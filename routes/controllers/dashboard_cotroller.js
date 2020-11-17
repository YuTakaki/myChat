const User = require('../../models/user');

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
    const {username} = req.body
    User.findOne({_id : req.params.id})
        .then(user => {
            user.contacts = user.contacts.filter(contact => contact.username !== username);
            user.save()
                .then(user => res.send(user));
        })
}

const sendMessage = (req, res) => {
    const {message, username, sender} = req.body;
    
}

module.exports = {
    getUserID,
    advanceSearch,
    getUserInfo,
    addToContact,
    deleteToContact,
    sendMessage
}