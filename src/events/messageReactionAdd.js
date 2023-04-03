const botConfig = require("../utils/botconfig.js");
const Logger = require('../utils/Logger');
const logger = new Logger({ debug: true });
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const MemesSchema = require("../models/memes.js");
const FanArtSchema = require("../models/fanart.js");
const memeChannel = "1091917541548490762";
const fanartChannel = "1091917731852464210";

module.exports = {
    name: 'messageReactionAdd',
    async execute(reaction, user) {
        if (user.bot) return;

        const allowedReactions = ['1092176040996126740', '1092176072453402665'];

        const upvoteEmoji = allowedReactions[0];
        const downvoteEmoji = allowedReactions[1];

        if (reaction.message.channel.id == memeChannel) {
            if (reaction.emoji.id === upvoteEmoji) {
                await MemesSchema.findOneAndUpdate({ Id: reaction.message.id }, { $inc: { upvotes: 1 } });

                logger.log(`User ${user.tag} upvoted ${reaction.message.id}`, 'reaction event');
                return;
            }

            if (reaction.emoji.id === downvoteEmoji) {
                await MemesSchema.findOneAndUpdate({ Id: reaction.message.id }, { $inc: { downvotes: 1 } });
                logger.log(`User ${user.tag} downvoted ${reaction.message.id}`, 'reaction event');
                return;
            }
        }

        if (reaction.message.channel.id == fanartChannel) {
            if (reaction.emoji.id === upvoteEmoji) {
                await FanArtSchema.findOneAndUpdate({ Id: reaction.message.id }, { $inc: { upvotes: 1 } });
                logger.log(`User ${user.tag} upvoted ${reaction.message.id}`, 'reaction event');
                return;

            }

            if (reaction.emoji.id === downvoteEmoji) {
                await FanArtSchema.findOneAndUpdate({ Id: reaction.message.id }, { $inc: { downvotes: 1 } });
                logger.log(`User ${user.tag} downvoted ${reaction.message.id}`, 'reaction event');
                return;
            }
        }






    }
};