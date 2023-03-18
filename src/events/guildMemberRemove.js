const Logger = require('../utils/Logger');
const logger = new Logger({ debug: true });
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const botConfig = require("../utils/botconfig.js");

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {

        const goodByeMessages = ["{user} has left the server.", "Goodbye {user}!", "See you later {user}!", "Bye {user}!"];
        const goodByeMessage = goodByeMessages[Math.floor(Math.random() * goodByeMessages.length)].replace('{user}',`<@!${member.user.id}>`);


        const embed = new MessageEmbed()
            .setTitle(`Goodbye ${member.user.tag}`)
            .setDescription(`${goodByeMessage}`)
            .setColor('PURPLE')
            .setTimestamp()
            .setFooter(`User ID: ${member.user.id}`)
            .setImage('https://media.tenor.com/SPkUmWsvnGIAAAAd/sumi-sakurasawa-rent-a-girlfriend.gif');

        await member.guild.channels.cache.get(botConfig.goodbyeChannel).send({ embeds: [embed] });

        logger.log(`Member left: ${member.user.tag}`);


    }
};