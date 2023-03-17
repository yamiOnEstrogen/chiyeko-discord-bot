const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const userSchema = require('../../models/user.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk-disable')
        .setDescription('Disable your AFK status!'),
    category: "User",
    async execute(interaction) {



        const user = await userSchema.findOne({ discordId: interaction.user.id });


        if (!user) {
            return await interaction.reply({ content: `You are not AFK!`, ephemeral: true });
        }

        user.isAfk = false;
        await user.save();

        const embed = new MessageEmbed()
           .setColor('GREEN')
           .setDescription(`You are no longer AFK!`)
           .setTimestamp();


           return await interaction.reply({ embeds: [embed], ephemeral: true });







    },
};