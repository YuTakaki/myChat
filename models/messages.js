const mongoose = require('mongoose');
const schema = mongoose.Schema;

const imageSchema = new schema({
    image : {
        type : String,
    },
    date : {
        type : Date,
        default : Date.now()
    }


})

const messageSchema = new schema({
    date : {
        type : Date,
        default : Date.now()
    },
    message : {
        type: String,
    },
    sender : {
        type: String,
        required: true
    },
    images : [imageSchema]
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