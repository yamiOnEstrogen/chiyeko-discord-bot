const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    isAfk: {
        type: Boolean,
        default: false,
        required: false,
    },
    afkReason: {
        type: String,
        default: '',
        required: false,
    },
    discordId: {
        type: String,
        required: true,
    },


})




module.exports = mongoose.model('User', userSchema);