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
            .addFields(
                {
                    name: 'Verify',
                    value: `Please verify yourself by clicking the button below!`,
                    inline: true
                }
            )
            .setTimestamp()
            .setFooter(`User ID: ${member.user.id}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setImage("https://media.tenor.com/73wKQVjruFcAAAAC/chiaki-nanami-anime.gif")

            


        await member.guild.channels.cache.get(botConfig.welcomeChannel).send({ embeds: [embed] });

        logger.log(`New member: ${member.user.tag}`);

        await interaction.member.roles.add(botConfig.memberRole);

        logger.log(`Added member role to ${member.user.tag}`);


       


        


        



    }
};