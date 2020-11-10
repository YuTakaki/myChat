const mongoose = require('mongoose');
const schema = mongoose.Schema;

const contactsSchema = new schema(
    {
        username : {
            type: String,
            required: true
        },
        senderProfile : {
            type: String,
        },
        date : {
            type : Date,
            default : Date.now()
        },
    }
);

module.exports = contactsSchema;