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

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('verify')
                    .setLabel('Verify')
                    .setStyle('PRIMARY')
            );

            const embedVerifed = new MessageEmbed()
            .setTitle(`Welcome to ${member.guild.name}`)
            .setDescription(`${randomWelcomeMessage}`)
            .setColor('PURPLE')
            .setFooter(`User ID: ${member.user.id}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))

            


        await member.guild.channels.cache.get(botConfig.welcomeChannel).send({ embeds: [embed], components: [row] });

        logger.info(`New member: ${member.user.tag}`);


        member.client.on('interactionCreate', async interaction => {
            if (!interaction.isButton()) return;
            if (interaction.customId === 'verify') {
                if (interaction.member.user.id != member.user.id) return;
                if (interaction.member.roles.cache.has(botConfig.memberRole)) return await interaction.reply({ content: `You are already verified!`, ephemeral: true });
                
                await interaction.member.roles.add(botConfig.memberRole);
                await interaction.update({ embeds: [embedVerifed], components: [] });
                logger.info(`Verified ${member.user.tag}`);
            }
        })

       


        


        



    }
};