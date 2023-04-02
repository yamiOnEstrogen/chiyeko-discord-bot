const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Levels = require("discord.js-leveling");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Check the leaderboard!'),
    category: "User",
    async execute(interaction) {



        const rawLeaderboard = await Levels.fetchLeaderboard(interaction.guild.id, 10);

        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = await Levels.computeLeaderboard(interaction.client, rawLeaderboard, true);

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);

        const embed = new MessageEmbed()
            .setTitle("Leaderboard")
            .setDescription(lb.join("\n\n"))


        await interaction.reply({ embeds: [embed] });








    },
};