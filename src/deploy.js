const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require("dotenv");

dotenv.config();

const commands = [];

const commandFolders = fs.readdirSync(path.join(__dirname, "commands"));

for (const folder of commandFolders) {

    const commandFiles = fs.readdirSync(path.join(__dirname, "commands", folder)).filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {

	        const command = require(path.join(__dirname, "commands", folder, file));

        commands.push(command.data.toJSON());


    }
}

const rest = new REST({ version: '9' }).setToken(process.env.token);

rest.put(Routes.applicationGuildCommands("1077684781774557233", "1091905976619249724"), { body: commands })
	.then(() => console.log("(/) Successfully registered application commands. (/)"))
	.catch(console.error);
