const mongoose = require('mongoose');

// Model for the data to be inserted into database
const dataSchema = new mongoose.Schema({
    data: { // Verifies that the data is an array of arrays of objects
        type: [[{
            id: {
                type: Number,
                required: true
            },
            who: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }]],
    }
});
const Message = mongoose.model('Data', dataSchema, 'messages'); // Model name is 'Data' and collection name is 'messages'
module.exports = Message;