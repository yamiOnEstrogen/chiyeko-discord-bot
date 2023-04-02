const mongoose = require("mongoose");
const Logger = require("../utils/Logger");
const logger = new Logger({ debug: true });
const cron = require("node-cron");
const Levels = require("discord.js-leveling");
const qotd = require("../utils/qotd.js");
const Twitter = require("../utils/twitter.js");
const webServer = require("../web-server.js");
const Github = require("../utils/github");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) { 
    const qotdClass = new qotd(client); // * Create a new instance of the qotd class
    const twitter = new Twitter(client); // * Create a new instance of the twitter class
    const github = new Github(client); // * Create a new instance of the github class
    console.clear();
    logger.log(`Logged in as ${client.user.tag}!`); // * Log the bot's tag
    logger.log(`Ready to serve a total of ${client.users.cache.size} users.`); // * Log the amount of users the bot is serving
    webServer(client); // * Start the web server

    const release = await github.getLatestRelease(); // * Get the latest release from github

    const activities = [`/help`, `with ${client.users.cache.size} caffine filled humans`, `v${release.tag_name}`, `I'm on github! (https://github.chiyeko.xyz)`,]

    setInterval(() => {
      const activity = activities[Math.floor(Math.random() * activities.length)]; //? Best way to do this?
      client.user.setActivity(activity, { type: "STREAMING", url: "https://www.twitch.tv/chiyekotheai" }); // TODO: Make this a config option
    }, 10000);

    mongoose.connect(process.env.db, { useNewUrlParser: true, useUnifiedTopology: true }); // * Connect to the database || (Placed this in a "one liner" to make it look cleaner)

    const db = mongoose.connection;

    db.on("error", (err) => { logger.error(err) }); // * Log any errors

    db.once("open", () => { logger.log("Connected to MongoDB") }); // * Log that the bot has connected to the database

    Levels.setURL(process.env.db);

     // cron.schedule("45 6 * * *", () => { qotdClass.generateQuestion() }); // * Generate a new question every day at 6:45am

    // twitter.on(); // * Start the twitter stream
    github.publishRelease(); // * Publish a new release to github


  },
};
