const mongoose = require("mongoose");
const Logger = require("../utils/Logger");
const logger = new Logger({ debug: true });
// const botConfig = require("../utils/botconfig.js");
// const axios = require("axios");
// const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const cron = require("node-cron");
const Levels = require("discord.js-leveling");
const qotd = require("../utils/qotd.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const qotdClass = new qotd(client);

    console.clear();
    logger.info(`Logged in as ${client.user.tag}!`);
    logger.info(`Ready to serve a total of ${client.users.cache.size} users.`);

    client.user.setActivity(`/  || Made By kiyo#5423`, {
       type: "WATCHING",
    });

    client.user.setStatus("dnd");

    mongoose.connect(process.env.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("error", (err) => {
      logger.error(err);
    });

    db.once("open", () => {
      logger.info("Connected to MongoDB");
    });

    Levels.setURL(process.env.db);

     cron.schedule("45 6 * * *", () => {
      qotdClass.generateQuestion();
    });
    


  },
};
