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
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const botConfig = require("./utils/botconfig.js");
dotenv.config();
const Logger = require("./utils/Logger.js");
const logger = new Logger({
  debug: true,
});
const Levels = require("discord.js-leveling");
client.commands = new Collection();


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
  if (message.guildId != "981632132701126726") return;

  message.delete();

  message.channel.send({
    content: `${mentionedUser.username} is currently AFK. Reason: ${user.afkReason}`,
  }).then((msg) => {
    setTimeout(() => msg.delete(), 5000);
  });
});







app.get("/", (req, res) => {
    res.send("Up!")
})




app.listen(process.env.PORT || 8080, () => {
  console.log("Server is now online!")
})


client.login(process.env.token);