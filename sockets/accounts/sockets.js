const User = require('../../models/user');
module.exports = socket => {
    socket.on('connectToUser', room => {
        socket.join(room);
    });
    socket.on('disconnectUser', room =>{
        socket.leave(room);
    });

    socket.on('sendMessage', ({message, username, sender, room}) => {

        User.findOne({username : sender})
        .then(user=>{
            if(user.messages.some(messageUser => messageUser.username === username)){
                user.messages.forEach(messageUser => {
                    if(messageUser.username === username){
                        messageUser.messages.push({message, sender});
                        messageUser.date = Date.now();
                    }
                });
            }else{
                user.messages.push({username, messages : [{sender , message}]});
                user.messages.forEach(messageUser => {
                    if(messageUser.username === username){
                        messageUser.date = Date.now();
                    }
                });
            }
            user.messages = user.messages.sort((a, b) => new Date(b.date) - new Date(a.date))
            user.save()
                .then(currentUser => {   
                    User.findOne({username})
                        .then(user=>{
                            const index = currentUser.messages.findIndex(messageUser => messageUser.username === username);
                            const _id = currentUser.messages[index]._id;
                            const length = currentUser.messages[index].messages.length - 1
                            const message_id = currentUser.messages[index].messages[length]._id;
                            if(user.messages.some(messageUser => messageUser.username === sender)){
                                user.messages.forEach(messageUser => {
                                    if(messageUser.username === sender){
                                        messageUser.messages.push({message, sender, _id : message_id});
                                        messageUser.date = Date.now();
                                    }
                                });
                            }else{
                                user.messages.push({_id, username : sender, messages : [{sender , message, _id : message_id}]});
                                user.messages.forEach(messageUser => {
                                    if(messageUser.username === username){
                                        messageUser.date = Date.now();
                                    }
                                });
                            }
                            user.messages = user.messages.sort((a, b) => new Date(b.date) - new Date(a.date));
                            user.save()
                                .then(user => {
                                    socket.broadcast.to(room).emit('send', currentUser)
                                    socket.emit('send', user)
                                    socket.broadcast.to(username).emit('updateUserData', user)
                                    socket.emit('updateUserData', currentUser)
                                });
                        });
                });
        });
    });
}