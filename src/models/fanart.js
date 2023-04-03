const mongoose = require('mongoose');
const { Schema } = mongoose;


const FanArtSchema = new Schema({
    attachment: {
        type: String,
    },

    user: {
        type: String,
    },

    date: {
        type: Date,
        default: Date.now,
    },

    upvotes: {
        type: Number,
        default: 0,
    },

    downvotes: {
        type: Number,
        default: 0,
    },

    mid: {
        type: String,
    },
})





module.exports = mongoose.model('FanArt', FanArtSchema);


/**
 * @typedef FanArt
 * @property {string} attachment
 * @property {string} user
 * @property {date} date
 * @property {number} upvotes
 * @property {number} downvotes
 * @property {string} mid
 * 
 * PATH: src\models\fanart.js
 */
