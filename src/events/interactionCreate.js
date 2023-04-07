const Logger = require('../utils/Logger');
const logger = new Logger({ debug: true });
const { MessageEmbed } = require('discord.js');
const botConfig = require("../utils/botconfig.js")
const LoggerService = require('../utils/loggingService.js');
const loggerService = new LoggerService("1091920227832447096");


module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (interaction.isCommand()) {
            logger.log(`Command ${interaction.commandName} was used by ${interaction.user.tag} in ${interaction.channel.name} in ${interaction.guild.name}`, "interaction")
            const command = interaction.client.commands.get(interaction.commandName);


            if (!command) return;

            try {
                await command.execute(interaction);
                loggerService.command(interaction)
            } catch (error) {
                console.error(error);
                const errorEmbed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('There was an error while executing this command!')
                    .setFooter('If this error persists, please open a ticket.')
                    .setTimestamp();
                await interaction.reply({ embeds: [errorEmbed] });
            }
        }

        else if (interaction.isButton()) {
            logger.log(`Button ${interaction.customId} was used by ${interaction.user.tag} in ${interaction.channel.name} in ${interaction.guild.name}`, "interaction")
            if (interaction.customId === 'verify') {
                await interaction.member.roles.add(botConfig.memberRole);
                await interaction.reply({ content: 'You have been verified!', ephemeral: true });
            }
            else if (interaction.customId.startsWith('role_')) {
                const role = interaction.customId.split('_')[1];

                const hasRole = interaction.member.roles.cache.has(role);

                if (hasRole) {
                    await interaction.member.roles.remove(role);
                    await interaction.reply({ content: 'Role removed!', ephemeral: true });
                    logger.log(`${interaction.user.tag} removed role ${interaction.client.guilds.cache.get(interaction.guild.id).roles.cache.get(role).name} in ${interaction.guild.name}`, "interaction")
                }
                else {
                    await interaction.member.roles.add(role);
                    await interaction.reply({ content: 'Role added!', ephemeral: true });
                    logger.log(`${interaction.user.tag} added role ${interaction.client.guilds.cache.get(interaction.guild.id).roles.cache.get(role).name} in ${interaction.guild.name}`, "interaction")
                }
            }
        }

    },
};