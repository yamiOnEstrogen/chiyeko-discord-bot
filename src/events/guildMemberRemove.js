const Logger = require('../utils/Logger');
const logger = new Logger({ debug: true });
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const botConfig = require("../utils/botconfig.js");
const Levels = require("discord.js-leveling");

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
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))

        await member.guild.channels.cache.get(botConfig.goodbyeChannel).send({ embeds: [embed] });

        logger.info(`Member left: ${member.user.tag}`);

        
        const user = await Levels.fetch(member.user.id, member.guild.id); // Selects the target from the database.

        if (!user) {
            return;
        }

        Levels.deleteUser(member.user.id, member.guild.id);

        logger.info(`Deleted ${member.user.tag} from the database`);

    }
};