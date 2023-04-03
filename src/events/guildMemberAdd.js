const Logger = require('../utils/Logger');
const logger = new Logger({ debug: true });
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const botConfig = require("../utils/botconfig.js");

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {

        const welcomeMessage = ["A Wild {user} appeared!", "Welcome {user}!", "Welcome to the server {user}! Hope you enjoy your stay!", "Looks like {user} brought pizza!"]

        const randomWelcomeMessage = welcomeMessage[Math.floor(Math.random() * welcomeMessage.length)].replace('{user}',`<@!${member.user.id}>`);
        
        const embed = new MessageEmbed()
            .setTitle(`Welcome to ${member.guild.name}`)
            .setDescription(`${randomWelcomeMessage}`)
            .setColor('PURPLE')
            .setTimestamp()
            .setFooter(`User ID: ${member.user.id}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setImage("https://media.tenor.com/73wKQVjruFcAAAAC/chiaki-nanami-anime.gif")

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL("https://indivoxystudios.com")
                    .setLabel(`Indivoxy Studios`)
                    .setStyle('LINK')
                    .setEmoji("<:pr:1091958428483719168>"),
            )

            


        await member.guild.channels.cache.get(botConfig.welcomeChannel).send({ embeds: [embed], components: [row] });

        logger.log(`New member: ${member.user.tag}`);
        logger.log(`Awating verification...`)


       


        


        



    }
};