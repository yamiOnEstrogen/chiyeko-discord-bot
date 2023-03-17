const Logger = require('../utils/Logger');
const logger = new Logger({ debug: true });
const { MessageEmbed } = require('discord.js');
const Levels = require("discord.js-leveling");


module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;
        if (message.channel.type === 'DM') return;


        const levelRewards = {
            15: "1077432247847751823",
            20: "1077432247847751824",
            30: "1077432247847751825",
            40: "11077432247847751826",
            59: "1077432247847751827"
        }

        const randomAmountOfXp = Math.floor(Math.random() * 56) + 1; // Min 1, Max 56
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
       
        if (hasLeveledUp) {
           
               const user = await Levels.fetch(message.author.id, message.guild.id);
               
               const levelEmbed = new MessageEmbed()
               .setTitle('New Level!')
               .setDescription(`**GG** ${message.author}, you just leveled up to level **${user.level}**!\n🥳`);


               for (const [key, value] of Object.entries(levelRewards)) {
                   if (user.level === parseInt(key)) {
                       const role = message.guild.roles.cache.get(value);
                       message.member.roles.add(role);
                       levelEmbed.addField('New Role!', `You have been given the **${role.name}** role!`)
                   }

               }
                if (message.guild.id !== '1077432247772258396') return;
               await message.channel.send({ embeds: [levelEmbed] })
               logger.info(`Level up message sent to ${message.author.tag} in ${message.guild.name}`);
           }

    },
};