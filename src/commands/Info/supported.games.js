const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const axios = require('axios').default;


module.exports = {
    data: new SlashCommandBuilder()
        .setName('supported-games')
        .setDescription('Get a list of supported games!'),

        category: "Info",
    async execute(interaction) {
        const image = "https://cdn.discordapp.com/attachments/981632133191843852/1086767861122478150/current_games.jpg";

        const embed = new MessageEmbed()
            .setTitle('Supported Games')
            .setColor('RANDOM')
            .setImage(image)
            .setFooter("If you want to see a game added, please create a ticket.")


        await interaction.reply({ embeds: [embed] });
    },
};