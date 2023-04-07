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

    favoriteAnime: {
        type: Array,
        default: [],
        required: false,
    },


})




module.exports = mongoose.model('User', userSchema);