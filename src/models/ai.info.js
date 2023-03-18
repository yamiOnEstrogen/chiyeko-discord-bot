const mongoose = require('mongoose');
const { Schema } = mongoose;


const aiSchema = new Schema({
    lastTweet: {
        type: String,
        required: true,
    },
    
})




module.exports = mongoose.model('Ai', aiSchema);