const chalk = require("chalk");



class Logger {
  constructor(options) {
    this.options = options;
  }

  log(message, level) {
    if (!level) level = "Client";
    console.log(
      `[${chalk.blueBright(new Date().toLocaleString())}] [${chalk.greenBright(
        level.toUpperCase()
      )}] ${message}`
    );
  }

  
}

module.exports = Logger;