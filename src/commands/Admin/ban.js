const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios').default;
const wait = require("util").promisify(setTimeout);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a user from the server!')
        .addUserOption(option => option.setName('user').setDescription('The user to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the ban').setRequired(true)),
    category: "Admin",
	async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');

        if (interaction.member.permissions.has('BAN_MEMBERS')) 
        {
            interaction.guild.members.ban(user, { reason: reason });
            const embed = new MessageEmbed()
                .setTitle(`User Banned`)
                .setColor('RANDOM')
                .setTimestamp()
                .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
           
            interaction.reply({ embeds: [embed] });  
        }
        else
        {
            interaction.reply({ content: `You do not have permission to **BAN** members!`, ephemeral: true });
        }
	},
};