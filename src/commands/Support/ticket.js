const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton, MessageCollector, MessageSelectMenu } = require("discord.js");
const axios = require("axios").default;
const wait = require("util").promisify(setTimeout);
const channelData = {
    staffRole: ["1006952317679046723", "996941131591974982"],
    //ticketParent: process.env.ticketParent,
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket")
        .setDescription("Create a ticket!")
        .addStringOption(option =>
            option
                .setName("category")
                .setDescription("The category for the ticket")
                .setRequired(true)
                .addChoices(
                    { name: 'Bug Report', value: 'ticket_bug' },
                    { name: 'User Report', value: 'ticket_reportUser' },
                    { name: 'Other', value: 'ticket_other' },
                )),
    isInDev: false,
    isStaffOnly: false,
    async execute(interaction) {
        const category = interaction.options.getString("category");
        const guild = interaction.guild;

        const createId = () => {
            let id = "";
            for (let i = 0; i < 10; i++) {
                id += Math.floor(Math.random() * 10);
            }
            return id;
        };



        const ticketChannel = await guild.channels.create(`ticket-${interaction.user.username}`, {
            type: "GUILD_TEXT",
            // parent: channelData.ticketParent,
            topic: `Ticket ID: ${createId()}`,
            permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ADD_REACTIONS", "ATTACH_FILES", "EMBED_LINKS"],
                },
                {
                    id: guild.roles.everyone,
                    deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ADD_REACTIONS", "ATTACH_FILES", "EMBED_LINKS"],
                },
                
                // For each channelData.staffRole, add a permission overwrite
                ...channelData.staffRole.map((role) => ({
                    id: role,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ADD_REACTIONS", "ATTACH_FILES", "EMBED_LINKS"],
                })),
            ],
        });

       




        const embed = new MessageEmbed()
            .setTitle(`Ticket`)
            .setColor("RED")
            .setDescription(`Your ticket has been created!`)
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed], ephemeral: true });










        const embed2 = new MessageEmbed()
            .setTitle(`Ticket`)
            .setColor("RED")
            .setDescription(`Thank you for contacting support! Please be patient while we get back to you.`)
            .setTimestamp()
            .setFooter(`Category: ${category.replace("ticket_", "")}`)
            





        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('closeTicket')
                    .setLabel('Close Ticket')
                    .setStyle('DANGER'),
            );

        await ticketChannel.send({ embeds: [embed2], components: [row] });

        const filter = i => i.customId === 'closeTicket' && i.user.id === interaction.user.id;
        const collector = ticketChannel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'closeTicket') {
                await i.deferUpdate();
                i.channel.send({ content: `Ticket closed by ${interaction.user.tag}`, components: [] }).then(() => {
                    i.channel.delete();
                });

                return;
            }
        });








    },
};