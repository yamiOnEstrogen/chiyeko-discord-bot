const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ship')
		.setDescription('Ship two users together!')
        .addUserOption(option => option.setName('user1').setDescription('The first user to ship').setRequired(true))
        .addUserOption(option => option.setName('user2').setDescription('The second user to ship').setRequired(true)),
        category: "Fun",
	async execute(interaction) {


        const user1 = interaction.options.get('user1').user;
        const user2 = interaction.options.get('user2').user;






        const embed = new MessageEmbed()
            .setDescription(`You two are ${Math.floor(Math.random() * 100)}% compatible!`)
            .setColor('RANDOM')
            const shipname = user1.username.slice(0, Math.floor(user1.username.length / 2)) + user2.username.slice(Math.floor(user2.username.length / 2));
            embed.setTitle(`${user1.username} x ${user2.username} = ${shipname}`);


            

        await interaction.reply({ embeds: [embed] });


	},
};
