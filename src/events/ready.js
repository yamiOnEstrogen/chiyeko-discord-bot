const mongoose = require("mongoose");
const Logger = require("../utils/Logger");
const logger = new Logger({ debug: true });
const cron = require("node-cron");
const Levels = require("discord.js-leveling");
const qotd = require("../utils/qotd.js");
const Twitter = require("../utils/twitter.js");
const webServer = require("../web-server.js");


module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const qotdClass = new qotd(client);
    const twitter = new Twitter(client);

    console.clear();
    logger.log(`Logged in as ${client.user.tag}!`);
    logger.log(`Ready to serve a total of ${client.users.cache.size} users.`);
    webServer(client);

    client.user.setActivity(`/ || ${client.users.cache.size} caffine filled humans`, {
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
      logger.log("Connected to MongoDB");
    });

    Levels.setURL(process.env.db);

     cron.schedule("45 6 * * *", () => {
      qotdClass.generateQuestion();
    });

    twitter.on();
    


  },
};
