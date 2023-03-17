const axios = require('axios').default;
const { MessageEmbed, MessageCollector } = require('discord.js');
const botConfig = require('./botconfig.js');

const decodeRandomThing = (str) => {
    // Get rid of all the characters that are like &#039; and replace them with '
    if (!str) throw new Error('No string provided'); // ! If there is no string provided, throw an error

    const regex = /&#(\d+);/g; // ! Regex to get all the characters that are like &#039;
    const matches = str.match(regex); // ! Get all the matches

    if (!matches) return str; // ! If there are no matches, return the string

    matches.forEach((match) => {
        const num = match.replace(/[&#;]/g, ''); // ! Get the number from the match
        const char = String.fromCharCode(num); // ! Get the character from the number
        str = str.replace(match, char); // ! Replace the match with the character
    }); 
}; 

const API_URL = "https://opentdb.com/api.php?amount=1&type=multiple "; // ! URL to get the questions from (https://opentdb.com/api_config.php)


let answers_correct = []; //* Array to store the answers (Correct answers)
let answers_incorrect = []; //* Array to store the answers (Incorrect answers)


class qotd {
    constructor(client) {
        this.client = client;
        this.qotdChannel = this.client.channels.cache.get(botConfig.qotdChannel); // ! Channel ID to send the question to
        this.aotdChannel = this.client.channels.cache.get(botConfig.aotdChannel); // ! Channel ID for users to answer the question
        this.qotdRole = this.client.guilds.cache.get(botConfig.guildID).roles.cache.get(botConfig.qotdRole); // ! Role ID to ping when the question is sent
    }

    async generateQuestion() {
        if (!this.client) throw new Error('No client provided'); // ! If there is no client provided, throw an error-
        if (!this.qotdChannel) throw new Error('No channel provided (QOTD)'); // ! If there is no channel provided, throw an error
        if (!this.aotdChannel) throw new Error('No channel provided (AOTD)'); // ! If there is no channel provided, throw an error
        if (!this.qotdRole) throw new Error('No role provided'); // ! If there is no role provided, throw an error


        console.log('Generating question...');
        const options = {
            method: 'GET',
            url: API_URL,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
            },
        };
        
        axios.request(options).then((response) => {
            console.log('Question generated!');
            const data = response.data.results[0];

            const question = decodeRandomThing(data.question); // ! Decode the question

            console.log('Clearing answers cache...');

            answers_correct = []; // ! Clear the array
            answers_incorrect = []; // ! Clear the array

            console.log('Answers cache cleared!');


            console.log('Decoding answers and placing them in the answers cache...');
            answers_correct.push(decodeRandomThing(data.correct_answer.toLowerCase())); // ! Push the correct answer to the array

            
            data.incorrect_answers.forEach((answer) => {
                answers_incorrect.push(decodeRandomThing(answer.toLowerCase())); // ! Push the incorrect answers to the array
            });

            console.log('Answers decoded and placed in the answers cache!');

            const qotdEmbed = new MessageEmbed()
            .setTitle('Question of the Day' + " | " + `${data.category.toString()}`)
            .setDescription(`${question.toString()}`)
            .addFields(
                {
                    name: 'Type',
                    value: `${data.type}`,
                    inline: true
                },
                {
                    name: 'Answer in',
                    value: `${this.aotdChannel}`,
                    inline: true
                }
            )
            .setFooter({
                text: `Difficulty: ${data.difficulty}`,
                iconURL: 'https://cdn.discordapp.com/emojis/1021415997992874055.webp?size=96&quality=lossless'
            })
            .setColor('RANDOM')
            .setTimestamp();

            this.qotdChannel.send({ embeds: [qotdEmbed], content: `${this.qotdRole}` }).then((msg) => {
                console.log('Question sent!');
                const collector = new MessageCollector(this.aotdChannel, (m) => m.author.id !== this.client.user.id, { time: 1000 * 60 * 5 });
                console.log('Message collector created!');

                collector.on('collect', (message) => {
                    if (message.author.bot) return; // ! If the message author is a bot, return (Don't do anything

                    this.checkAnswer(message.content).then((result) => {
                        
                        if (result) {
                            message.reply('That is correct!');
                        } else {
                            message.reply('That is incorrect!');
                        }
                    });
                });

                collector.on('end', (collected) => {
                    console.log(`Collected ${collected.size} messages`);

                    this.aotdChannel.send(`The question has ended!`);
                });
            });

        }).catch((error) => {
            console.error(error);
        });
    }

    async checkAnswer(answer) {
        
        console.log('Checking answer...');

        answer = answer.toLowerCase(); // ! Make the answer lowercase

        if (answers_correct.includes(answer)) {
            console.log('Answer is correct!');
            return true;
        } else {
            console.log('Answer is incorrect!');
            return false;
        }
    }
}

module.exports = qotd;
