const Logger = require('../utils/Logger');
const logger = new Logger({ debug: true });
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isCommand()) return;

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
    },
};