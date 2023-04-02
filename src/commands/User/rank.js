const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Levels = require("discord.js-leveling");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Check your rank!'),
    category: "User",
    async execute(interaction) {



        const user = await Levels.fetch(interaction.user.id, interaction.guild.id);

        if (!user) return interaction.reply({ content: "Seems like this user has not earned any xp so far." }); 

        const embed = new MessageEmbed()
            .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })

            })
            .setDescription(`**Level - ${user.level}**\n**XP - ${interaction.client.formatNumbers(user.xp)}**`)


        await interaction.reply({ embeds: [embed] });








    },
};