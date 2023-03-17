const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const axios = require('axios').default;


module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get help with the bot!'),

        category: "Info",
    async execute(interaction) {

        const commands = interaction.client.commands;

        const embed = new MessageEmbed()
            .setTitle('Help')
            .setColor('RANDOM')
            .setThumbnail(interaction.client.user.displayAvatarURL())

            commands.forEach(command => {
                embed.addField(`**/${command.data.name}**`, `${command.data.description}`);

            })

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('help')
                    .setPlaceholder('Select a command')
                    .addOptions(commands.map(command => {
                        return {
                            label: command.data.name,
                            description: command.data.description,
                            value: command.data.name
                        }
                    }))
            )


        await interaction.reply({ embeds: [embed], components: [row] });


        interaction.client.on('interactionCreate', async interaction => {
            if (!interaction.isSelectMenu()) return;

            if (interaction.customId === 'help') {

                const command = interaction.client.commands.get(interaction.values[0]);

                const embed = new MessageEmbed()
                    .setTitle(`Help - ${command.data.name}`)
                    .setColor('RANDOM')
                    .addField('Description', command.data.description)
                    .addField('Usage', `\`/${command.data.name} ${command.data.options ? command.data.options.map(option => option.required ? `<${option.name}>` : `[${option.name}]`).join(' ') : ''}\``)
                    
                    .setTimestamp()

                await interaction.update({ embeds: [embed] });

            }
        })
        

    },
};