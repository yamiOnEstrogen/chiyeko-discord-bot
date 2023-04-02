const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('steal-emoji')
        .setDescription('Steal an emoji from another server')
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('The emoji to steal')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the emoji')
                .setRequired(false)),
    category: "Admin",
    async execute(interaction) {

        if (!interaction.member.permissions.has('MANAGE_EMOJIS')) return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });

		const emoji = interaction.options.getString('emoji');




        const emojiRegex = /<?(a)?:?(\w{2,32}):(\d{17,19})>?/g;
        const emojiID = emoji.match(emojiRegex)[0].split(':')[2].replace('>', '');

        let animated;

        if (emoji.includes('a:')) {
            animated = true;
        } else {
            animated = false;        
        }

        const url = `https://cdn.discordapp.com/emojis/${emojiID}.${animated ? 'gif' : 'png'}`;

        const name = interaction.options.getString('name') || emoji.match(emojiRegex)[0].split(':')[1];

        const guild = interaction.guild;


        const newEmoji = await guild.emojis.create(url, name);

        const embed = new MessageEmbed()
            .setTitle('Emoji Stolen')
            .setDescription(`We have stolen the emoji ${newEmoji}`)
            .setColor('GREEN')
            .setTimestamp();

        interaction.reply({ embeds: [embed] });


    },
};
