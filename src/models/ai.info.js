const mongoose = require('mongoose');
const { Schema } = mongoose;


const aiSchema = new Schema({
    lastTweet: {
        type: String,
        required: false,
    },

    lastVersionNumber: {
        type: String,
        required: false,
    },


})




module.exports = mongoose.model('Ai', aiSchema);