const { MessageEmbed } = require('discord.js');
const botConfig = require("./botconfig.js")
const Logger = require('./Logger');
const logger = new Logger({ debug: true });


class LoggerService {
    constructor(logChannel) {
        this.logChannel = logChannel;
    }

    async command(interaction) {
        const user = interaction.user;
        const command = interaction.commandName;
        const args = interaction.options._hoistedOptions;
        const timestamp = new Date().getTime();
        const time = new Date(timestamp).toLocaleString('en-US', { timeZone: 'America/New_York' });

        const commandEmbed = new MessageEmbed()
            .setColor('#00ff00')
            .setTitle('Command Executed')
            .setDescription(`Command ${command} was used by ${user.tag} in ${interaction.channel.name} in ${interaction.guild.name} at ${time} EST`)
            .setFooter(`User ID: ${user.id} || Logging Service`)
            .setTimestamp();

        if (args && args.length > 0) {
            commandEmbed.addField('Arguments', args.map(arg => `${arg.name}: ${arg.value}`).join('\n'));
        }

        const logChannel = interaction.client.channels.cache.get(this.logChannel);
        await logChannel.send({ embeds: [commandEmbed] });
            
    }
}

module.exports = LoggerService;