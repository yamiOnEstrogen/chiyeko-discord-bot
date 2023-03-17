const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios').default;
const wait = require("util").promisify(setTimeout);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Purge messages from a channel')
        .addNumberOption(option => option.setName('amount').setDescription('The amount of messages to purge').setRequired(true))
        .addUserOption(option => option.setName('user').setDescription('The user to purge from the channel').setRequired(false)),
    category: "Admin",
	async execute(interaction) {
        const user = interaction.options.getUser('user');
        const amount = interaction.options.getNumber('amount');


        if (interaction.member.permissions.has('MANAGE_MESSAGES'))
        {
            if (amount > 100) {
                return interaction.reply({ content: 'You can only purge 100 messages at a time', ephemeral: true });
            }
            else if (amount < 1) {
                return interaction.reply({ content: 'You must purge at least 1 message', ephemeral: true });
            }
            else {
                if (user) {
                    const messages = await interaction.channel.messages.fetch({ limit: amount });
                    const filteredMessages = messages.filter(m => m.author.id === user.id);
                    await interaction.channel.bulkDelete(filteredMessages);
                    const embed = new MessageEmbed()
                        .setTitle(`Purged Messages`)
                        .setDescription(`**User:** ${user}\n**Amount:** ${amount}`)
                        .setColor('RANDOM')
                        .setTimestamp()
                        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

                    interaction.reply({ embeds: [embed] });
                }
                else {
                    await interaction.channel.bulkDelete(amount);
                    const embed = new MessageEmbed()
                        .setTitle(`Purged Messages`)
                        .setDescription(`**Amount:** ${amount}`)
                        .setColor('RANDOM')
                        .setTimestamp()
                        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
                   
                    interaction.reply({ embeds: [embed] });
                }
            }
        }
        else
        {
            interaction.reply({ content: `You do not have permission to **PURGE**!`, ephemeral: true });
        }
	},
};
