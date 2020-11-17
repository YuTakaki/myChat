const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const socket = require('socket.io');
const User = require('./models/user');

const app = express();
const mongodb = 'mongodb://localhost/myChat';

mongoose.connect(mongodb, {useNewUrlParser : true, useUnifiedTopology: true})
    .then(() => console.log('connected to database'))
    .catch(err => console.log(err))

const port = process.env.PORT|| 4000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./auth_setup/passport')(passport);
app.use(session({
    secret : 'cat',
    saveUninitialized : 'true',
    resave : true,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/authentication', require('./routes/authentication'));
app.use('/dashboard', require('./routes/dashboard'));

const server = app.listen(port, () => console.log(`you are listening to port ${port}`));

const io = socket(server);
let users = 0
io.sockets.on('connection', socket => {
    console.log(socket.id);
    users++
    console.log(users);
    socket.on('connectToUser', room => {
        socket.join(room);
        console.log(socket.id + ' jioin' + room);
        console.log(room);
        
    });
    socket.on('disconnectUser', room =>{
        console.log('leave')
        socket.leave(room);
    });
    
    socket.on('sendMessage', ({message, username, sender, room}) => {
        console.log(message + ' ' + socket.id)

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
                                    socket.broadcast.to(room).emit('send', currentUser)
                                    socket.emit('send', user)
                                });
                        });
                });
        });
    });
    
    
    socket.on('disconnect', room => {
        console.log('disconnect' + socket.id)
        users--;
        console.log(users);
    })
    

});