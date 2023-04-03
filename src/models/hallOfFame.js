const mongoose = require('mongoose');
const { Schema } = mongoose;


const hallOfFameSchema = new Schema({
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





module.exports = mongoose.model('HallOfFame', hallOfFameSchema);


/**
 * @typedef HallOfFame
 * @property {string} attachment
 * @property {string} user
 * @property {date} date
 * @property {number} upvotes
 * @property {number} downvotes
 * @property {string} mid
 * 
 * PATH: src\models\hallOfFame.js
 */
