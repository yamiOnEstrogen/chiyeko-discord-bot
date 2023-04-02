const botConfig = require("../utils/botconfig.js");
const Logger = require('../utils/Logger');
const logger = new Logger({ debug: true });
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const Levels = require("discord.js-leveling");

const generateVerifyCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
};

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        const prefix = "c.";

        if (message.author.bot) return;

        if (!message.content.startsWith(prefix)) {

            const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
            const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);

            if (hasLeveledUp) {

                if (message.guild.id != "1091905976619249724") return;
                const level_channel = message.guild.channels.cache.get("1091917864350519337")

                const user = await Levels.fetch(message.author.id, message.guild.id);

                const levelEmbed = new MessageEmbed()
                    .setTitle('New Level!')
                    .setDescription(`**GG** ${message.author}, you just leveled up to level **${user.level}**!`)

                const s = await level_channel.send({ embeds: [levelEmbed], content: `<@!${message.author.id}>` })

                s.react('🎉');
            }

        }

        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if (command === "verify") {
            if (message.channel.id != botConfig.verifyChannel) return;

            if (message.member.roles.cache.has(botConfig.memberRole)) return;

            // Check if there are any args
            if (args.length) return message.reply({ content: "Please do not provide any arguments!" }).then(msg => { setTimeout(() => msg.delete(), 5000) });

            const verifyCode = generateVerifyCode();

            message.reply({ content: `Please type \`${verifyCode}\` in the chat to verify yourself!` })

            const filter = m => m.author.id === message.author.id;

            const collector = message.channel.createMessageCollector(filter, { time: 60000 });
            collector.on("collect", async m => {
                if (m.author.id !== message.author.id) return;
                if (m.content !== verifyCode) return message.reply({ content: "Invalid code!" }).then(msg => { setTimeout(() => msg.delete(), 5000) });
                if (m.content === verifyCode) {
                    message.member.roles.add(botConfig.memberRole);
                    message.reply({ content: "You have been verified!" }).then(msg => { setTimeout(() => msg.delete(), 5000) });
                    collector.stop();
                }
            });
            collector.on("end", collected => {
                if (collected.size === 0) {
                    message.reply({ content: "Verification timed out!" }).then(msg => { setTimeout(() => msg.delete(), 5000) });
                }
            });
        }

        if (command === "p") {
            // Nuke the channel (delete all messages)
            if (message.member.roles.cache.has("1091909117829984336")) {
                const fetched = await message.channel.messages.fetch({ limit: 99 });
                message.channel.bulkDelete(fetched);
            }
            else {
                message.reply({ content: "You do not have permission to use this command!" }).then(msg => { setTimeout(() => msg.delete(), 5000) });
            }
        }
    }
};