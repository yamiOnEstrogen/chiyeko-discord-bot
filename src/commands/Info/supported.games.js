const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const axios = require('axios').default;


module.exports = {
    data: new SlashCommandBuilder()
        .setName('supported-games')
        .setDescription('Get a list of supported games!'),

        category: "Info",
    async execute(interaction) {

        const embed = new MessageEmbed()
            .setTitle('Supported Games')
            .setColor('RANDOM')
            .addFields(
                {
                    name: 'Osu!',
                    value: '87%', // TODO: Add multiplayer support
                },
                {
                    name: 'Genshin Impact',
                    value: '50%', // TODO: Add Fighing Support, and Quest Suuport
                }
            )
            .setFooter({
                text: 'If you want to see a game added, please DM me on Discord! (kiyo#8650)',
                iconURL: interaction.client.getUser('547923574833545226').avatarURL({ dynamic: true })

            })


        await interaction.reply({ embeds: [embed] });
    },
};