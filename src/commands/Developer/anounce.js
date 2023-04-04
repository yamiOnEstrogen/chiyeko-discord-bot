const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');
const path = require('path');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('anounce')
		.setDescription('Anounce something to the server')
        .addStringOption(option =>
            option
            .setName('message')
            .setDescription('The message to anounce')
            .setRequired(true))
        .addAttachmentOption(option =>
            option
            .setName('attachment')
            .setDescription('The attachment to anounce')
            .setRequired(false)),
        category: 'Developer',
	async execute(interaction) {

       
        const text = interaction.options.getString('message');
        const attachment = interaction.options.getAttachment('attachment');
       

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Anouncement')
            .setDescription(text)
            .setFooter({
                text: `Anounced by ${interaction.user.tag}`,
                iconURL: interaction.user.avatarURL({ dynamic: true })
            });

        if (attachment) {
            embed.setImage(attachment.url);
        }

        

        await interaction.reply({ content: 'Anouncement sent!', ephemeral: true } );

        const newsChannel = interaction.client.channels.cache.get('1091914987812958208');

        if (!newsChannel) throw new Error('Could not find news channel');

        await newsChannel.send({ embeds: [embed] });

        
	},
};
