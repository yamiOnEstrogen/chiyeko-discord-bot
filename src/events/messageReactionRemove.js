const botConfig = require("../utils/botconfig.js");
const Logger = require('../utils/Logger');
const logger = new Logger({ debug: true });
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const hallOfFame = require("../models/hallOfFame.js");
const memeChannel = "1091917541548490762";

module.exports = {
    name: 'messageReactionRemove',
    async execute(reaction, user) {
        if (user.bot) return;

        const allowedReactions = ['1092176040996126740', '1092176072453402665'];

        if (reaction.message.channel.id !== memeChannel) return;

        const upvoteEmoji = allowedReactions[0];
        const downvoteEmoji = allowedReactions[1];

        if (reaction.emoji.id === upvoteEmoji) {
            await hallOfFame.findOneAndUpdate({ Id: reaction.message.id }, { $inc: { upvotes: -1 } });

           logger.log(`User ${user.tag} removed upvote from, ${reaction.message.id}`,'reaction event');
            return;
        }

        if (reaction.emoji.id === downvoteEmoji) {
            await hallOfFame.findOneAndUpdate({ Id: reaction.message.id }, { $inc: { downvotes: -1 } });
            logger.log(`User ${user.tag} removed downvote from, ${reaction.message.id}`,'reaction event');
            return;
        }
    }
};