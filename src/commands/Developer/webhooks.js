const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const fs = require('fs');
const path = require('path');

const webhookFolder = path.join(__dirname, '../../discord/webhooks');

const webhooks = fs.readdirSync(webhookFolder).filter(file => file.endsWith('.json'));

const convertToMarkdownJson = (json) => {return `\`\`\`json\n${JSON.stringify(json, null, 2)}\n\`\`\``; }

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dev-webhooks')
		.setDescription('View all webhooks in the server'),
        category: 'Developer',
	async execute(interaction) {

        const colors = [
            "BLUE",
            "RED",
            "PINK",
            "PURPLE",
            "YELLOW",
            "GREY"
        ];


        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Webhooks')
            .setDescription('Here are all the webhooks in the server');

       
        

            const row = new MessageActionRow()
            row.addComponents(
                new MessageSelectMenu()
                  .setCustomId('select-webhook')
                  .setPlaceholder('Select a webhook')
                  .addOptions([
                    webhooks.map(webhook => {
                        return {
                            label: webhook.replace('.json', ''),
                            value: webhook.replace('.json', '').toLowerCase(),
                        };
                    }),
                    ]),
            );

            await interaction.reply({ embeds: [embed], components: [row] });
           


            interaction.client.on('interactionCreate', async interaction => {
                if (!interaction.isSelectMenu()) return;

                fs.readFile(path.join(__dirname, `../../discord/webhooks/${interaction.values[0]}.json`), 'utf8', async (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    const dataParsed = JSON.parse(data);
                    const dataP = dataParsed.backups[0];
                    
                    const embed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`Webhook Version ${dataParsed.version.toString()}`)
                        .setDescription(convertToMarkdownJson(dataP));
                   
                        interaction.update({ embeds: [embed] });
                });
            })


	},
};
