const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('supporter')
        .setDescription('Get the list of perks for being a supporter!'),
        category: "Info",
    async execute(interaction) {

        const perks = [
            {
                name: "Get added to the supporter list!",
                description: "You will be added to the supporter list on the website!",
            },
            {
                name: "Get access to supporter only things.",
                description: "You will get access to supporter only things such as supporter only commands and supporter only channels!",
            },
            {
                name: "Keep us alive!",
                description: "You will be helping to keep Chiyeko alive and running!",
            },
            {
                name: "A Special Thank You!",
                description: "You will get a special thank you from the Chiyeko team!",
            }
        ];


        const embed = new MessageEmbed()
            .setTitle('Supporter Perks')
            .setColor('RANDOM')
            .setThumbnail(interaction.client.user.displayAvatarURL())

            perks.forEach(perk => {
                embed.addField(`**${perk.name}**`, `${perk.description}`);

            })

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Supporter')
                    .setStyle('LINK')
                    .setURL('https://chiyeko.xyz/donate')
            )

            await interaction.reply({ embeds: [embed], components: [row] });

    },
};