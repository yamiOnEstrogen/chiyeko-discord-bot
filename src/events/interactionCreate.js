const Logger = require('../utils/Logger');
const logger = new Logger({ debug: true });
const { MessageEmbed } = require('discord.js');
const botConfig = require("../utils/botconfig.js")


module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isCommand()) {

            const command = interaction.client.commands.get(interaction.commandName);


            if (!command) return;

            try {
                await command.execute(interaction);
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

        if (interaction.isButton()) {
            if (interaction.customId === 'verify') {
                await interaction.member.roles.add(botConfig.memberRole);
                await interaction.reply({ content: 'You have been verified!', ephemeral: true });
            }
        }
    },
};