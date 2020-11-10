const mongoose = require('mongoose');
const schema = mongoose.Schema;
const message = require('./messages');
const contacts = require('./contacts')

const userSchema = new schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    date : {
        type : Date,
        default : date.now()
    },
    messages : [message],
    contacts : [contacts],
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;