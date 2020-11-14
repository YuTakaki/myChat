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
    User.findOne({username : sender})
        .then(user=>{
            if(user.messages.some(messageUser => messageUser.username === username)){
                user.messages.map(messageUser => {
                    if(messageUser.username === username){
                        messageUser.messages.push({message, sender})
                    }
                });
                user.date = Date.now();
            }else{

                user.messages.push({username, messages : [{sender , message}]})
            }
            user.save()
                .then(currentUser => {   
                    User.findOne({username})
                        .then(user=>{
                            const index = currentUser.messages.findIndex(messageUser => messageUser.username === username);
                            const _id = currentUser.messages[index]._id;
                            const length = currentUser.messages[index].messages.length - 1
                            const message_id = currentUser.messages[index].messages[length]._id;
                            if(user.messages.some(messageUser => messageUser.username === sender)){
                                user.messages.map(messageUser => {
                                    if(messageUser.username === sender){
                                        messageUser.messages.push({message, sender, _id : message_id});
                                    }
                                });
                                user.date = Date.now();
                            }else{
                                user.messages.push({_id, username : sender, messages : [{sender , message, _id : message_id}]});
                            }
                            user.save()
                                .then(user => {
                                    res.send(true);
                                });
                        });
                });
        });
}

module.exports = {
    getUserID,
    advanceSearch,
    getUserInfo,
    addToContact,
    deleteToContact,
    sendMessage
}