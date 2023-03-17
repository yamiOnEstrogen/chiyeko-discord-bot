const Logger = require("./Logger");
const logger = new Logger({ debug: true });
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const botConfig = require("./botconfig.js");
const axios = require("axios");

let lastTweet = null;

async function getIdFromUsername(u) {
    const url = `https://api.twitter.com/2/users/by/username/${u}?user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld`;
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.api_key}`,
    },
  };

  const response = await axios.get(url, config);

  const id = response.data.data.id;
  const userData = {
    data: {
        id: id,
        name: response.data.data.name,
        username: response.data.data.username,
        image: response.data.data.profile_image_url,
    }
  }

    return userData;
}

class Twitter {
  constructor(client, user = "chiyekovt") {
    this.client = client;
    this.user = user;
  }

  async on() {
    setInterval(async () => {
      const user = await getIdFromUsername(this.user);
        const uId = user.data.id;

      

      const url = `https://api.twitter.com/2/users/${uId}/tweets?max_results=5`; //! The `max_results` query parameter value [1] is not between 5 and 100
      const config = {
        headers: {
          Authorization: `Bearer ${process.env.api_key}`,
        },
      };

        const response = await axios.get(url, config).catch((err) => {
            logger.log(err, "twitter");
        })

        const tweet = response.data.data[0];

        const tweetCheck = await this.client.channels.fetch("1015727808032542730").then((channel) => {
            const messages = channel.messages.cache;
            if (messages.size === 0) return;
            const lastMessage = messages.last();
            if (!lastMessage.embeds[0]) return;
            const lastMessageEmbed = lastMessage.embeds[0];
            const lastMessageFooter = lastMessageEmbed.footer.text;

            if (lastMessageFooter === tweet.id) {
                return true;
            }
            else {
                return false;
            }
        })

        if (tweetCheck) return;

        if (tweet.text.startsWith("RT")) return;

        logger.log(`New tweet from ${this.user}!`, "twitter");

        const embed = new MessageEmbed()
            .setAuthor(user.data.name, user.data.image, `https://twitter.com/${user.data.username}`)
            .setDescription(tweet.text)
            .setFooter(`${tweet.id}`)

        const button = new MessageButton()
            .setStyle("LINK")
            .setLabel("View Tweet")
            .setURL(`https://twitter.com/${user.data.username}/status/${tweet.id}`)

        const row = new MessageActionRow()
            .addComponents(button)

        const channel = await this.client.channels.fetch("1015727808032542730");
        channel.send({ embeds: [embed], components: [row] });

    }, 10000); // ! Hardcoded value because I don't want to make it a parameter
  }

  async getTweets() {
    const user = await getIdFromUsername(this.user);
        const uId = user.data.id;

      

      const url = `https://api.twitter.com/2/users/${uId}/tweets?max_results=5`; //! The `max_results` query parameter value [1] is not between 5 and 100
      const config = {
        headers: {
          Authorization: `Bearer ${process.env.api_key}`,
        },
      };

        const response = await axios.get(url, config).catch((err) => {
            logger.log(err, "twitter");
        })

        const tweets = response.data.data;

        let tweetArray = [];

        tweets.forEach((tweet) => {
           tweetArray.push({
                id: tweet.id,
                text: tweet.text,
                username: user.data.username,
                name: user.data.name,
                image: user.data.image,
           })
        });

        return tweetArray;
  }
}

module.exports = Twitter;
