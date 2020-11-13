const mongoose = require('mongoose');
const schema = mongoose.Schema;

const messageSchema = new schema({
    date : {
        type : Date,
        default : Date.now()
    },
    message : {
        type: String,
        required: true
    },
    sender : {
        type: String,
        required: true
    },
});
const messagesSchema = new schema({
    username : {
        type: String,
        required: true
    },
    senderProfile : {
        type: String,
        default:'',
    },
    date : {
        type : Date,
        default : Date.now()
    },
    messages : [messageSchema]
});

module.exports = messagesSchema;