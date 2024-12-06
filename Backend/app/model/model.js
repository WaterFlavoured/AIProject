const mongoose = require('mongoose');

// Updated schema to match the new data structure
const chatSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    messages: [
        {
            id: {
                type: Number,
                required: true
            },
            who: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }
    ]
});

const Chat = mongoose.model('Chat', chatSchema, 'chats');
module.exports = Chat;
