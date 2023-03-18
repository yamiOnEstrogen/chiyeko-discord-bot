const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageCollector } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  allowedMentions: { parse: ["users", "roles"], repliedUser: true },
});

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
client.commands = new Collection();
const config = require("./utils/botconfig.js");

client.formatDate = (date) => {
  if (!date) return "No date provided";
  return new Date(date).toLocaleString();
};

client.socials = [
  {
    name: "Twitter",
    url: "https://twitter.com/chiyekovt",
  },
  {
    name: "Twitch",
    url: "https://twitch.tv/chiyekotheai",
  },
  {
    name: "Discord",
    url: "https://discord.gg/ZuPHXurZvn",
  },
  {
    name: "Reddit",
    url: "https://reddit.com/r/chiyekovtuber",
  }
];


client.staff = () => {
  const guild = client.guilds.cache.get(config.guildID);
  const staff_role = guild.roles.cache.get(process.env.staffRole);
  
  const staff = guild.members.cache.filter(member => member.roles.cache.has(staff_role.id));

  const checkForAnimatedAvatar = (member) => {
    if (member.user.avatar.startsWith("a_")) return `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.gif`;
    else return `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`;
  };

  const staffArray = staff.map((member) => {
    return {
      name: member.user.username,
      avatar: checkForAnimatedAvatar(member),
      id: member.user.id,
      tag: member.user.tag,
    };
  });

  return staffArray;
};


const commandFolders = fs.readdirSync(path.join(__dirname, "commands"));

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(path.join(__dirname, "commands", folder)).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(path.join(__dirname, "commands", folder, file));
        client.commands.set(command.data.name, command);
    }
}

const eventFiles = fs.readdirSync(path.join(__dirname, "events")).filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
    const event = require(path.join(__dirname, "events", file));
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}






client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const userSchema = require("./models/user");

  // Check if the author mentioned a user
  if (!message.mentions.users.first()) return;

  // Get the mentioned user
  const mentionedUser = message.mentions.users.first();

  // Check if the mentioned user is a bot
  if (mentionedUser.bot) return;

  const user = await userSchema.findOne({
    discordId: mentionedUser.id,
  });


  if (!user.isAfk) return;
  if (message.guildId != config.guildID) return;

  message.delete();

  message.channel.send({
    content: `${mentionedUser.username} is currently AFK. Reason: ${user.afkReason}`,
  }).then((msg) => {
    setTimeout(() => msg.delete(), 5000);
  });
});


client.login(process.env.token);