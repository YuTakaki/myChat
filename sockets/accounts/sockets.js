const User = require('../../models/user');
module.exports = socket => {
    socket.on('connectToUser', room => {
        socket.join(room);
    });
    socket.on('disconnectUser', room =>{
        socket.leave(room);
    });

    socket.on('sendMessage', ({message, username, sender, room, images}) => {

        User.findOne({username : sender})
        .then(user=>{
            if(user.messages.some(messageUser => messageUser._id.toString() === room)){
                user.messages.forEach(messageUser => {
                    if(messageUser._id.toString() === room){
                        messageUser.messages.push({message, sender, images});
                        messageUser.date = Date.now();
                    }
                });
            }else{
                user.messages.push({_id: room, username, messages : [{sender , message, images}]});
                user.messages.forEach(messageUser => {
                    if(messageUser._id.toString() === room){
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
                            const _id = currentUser._id;
                            const length = currentUser.messages[index].messages.length - 1
                            const message_id = currentUser.messages[index].messages[length]._id;
                            if(user.messages.some(messageUser => messageUser._id.toString() === _id.toString())){
                                user.messages.forEach(messageUser => {
                                    if(messageUser._id.toString() === _id.toString()){
                                        messageUser.messages.push({message, sender, _id : message_id, images});
                                        messageUser.date = Date.now();
                                    }
                                });
                            }else{
                                user.messages.push({_id, username : sender, messages : [{sender , message, _id : message_id, images}]});
                                user.messages.forEach(messageUser => {
                                    if(messageUser.username === username){
                                        messageUser.date = Date.now();
                                    }
                                });
                            }
                            user.messages = user.messages.sort((a, b) => new Date(b.date) - new Date(a.date));
                            user.save()
                                .then(user => {
                                    socket.broadcast.to(room).emit('send', user)
                                    socket.emit('send', currentUser)
                                    socket.broadcast.to(room).emit('updateUserData', user)
                                    socket.emit('updateUserData', currentUser)
                                });
                        });
                });
        });
    });
}