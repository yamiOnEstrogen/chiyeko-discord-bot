const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const userSchema = require('../../models/user.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Set your AFK status!')
        .addStringOption(option =>
            option
            .setName('reason')
            .setDescription('Set the reason for the AFK')
            .setRequired(true)
        ),
    category: "User",
    async execute(interaction) {


        const reason = interaction.options.getString('reason');
        const user = await userSchema.findOne({ discordId: interaction.user.id });

        if (!user) {
            const newUser = new userSchema({
                username: interaction.user.username,
                isAfk: true,
                afkReason: reason,
                discordId: interaction.user.id,
            });
            await newUser.save();
            const afkEmbed = new MessageEmbed()
                .setTitle(`AFK Status Set!`)
                .setDescription(`You are now AFK!`)
                .setColor("GREEN")
                .setTimestamp();

           return await interaction.reply({ embeds: [afkEmbed], ephemeral: true });
        }

        user.isAfk = true;
        user.afkReason = reason;
        await user.save();


        const afkEmbed = new MessageEmbed()
                .setTitle(`AFK Status Set!`)
                .setDescription(`You are now AFK!`)
                .setColor("GREEN")
                .setTimestamp();

           return await interaction.reply({ embeds: [afkEmbed], ephemeral: true });





    },
};
