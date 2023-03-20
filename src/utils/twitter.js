const Logger = require("./Logger");
const logger = new Logger({ debug: true });
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const botConfig = require("./botconfig.js");
const axios = require("axios");
const aiSchema = require("../models/ai.info.js");

let lastTweet = null;

async function getIdFromUsername(u) {
  if (!u) throw new Error("No username provided");
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

async function getTweetData(id) {
  if (!id) throw new Error("No tweet ID provided");

  const url = "https://api.twitter.com/2/tweets?ids=" + id + "&expansions=attachments.media_keys&media.fields=duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width,alt_text";

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.api_key}`,
    },
  };

  const response = await axios.get(url, config);

  return response.data;


}

class Twitter {
  constructor(client, user = "chiyekovt") {
    this.client = client;
    this.user = user;
  }

  async on(isDev = false) {
    const time = () => {
      if (isDev) return 2000;
      else return 10000;
    }

    setInterval(async () => {
      const user = await getIdFromUsername(this.user);
      const uId = user.data.id;

      if (isDev) console.log(user);





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

      if (isDev) console.log(tweet);

      if (tweet.text.startsWith("RT")) return;

      const tData = await getTweetData(tweet.id).then((url) => {
        return url;
      })

      if (isDev) console.log(tData);

      await aiSchema.findOne({ lastTweet: tweet.id }).then(async (ai) => {
        if (isDev) console.log(ai);
        if (ai) return;

        await aiSchema.findOneAndUpdate({ lastTweet: tweet.id }, { lastTweet: tweet.id }, { upsert: true });

        const embed = new MessageEmbed()
          .setTitle(`${user.data.name} (@${user.data.username})`)
          .setDescription(tweet.text)
          .setURL(`https://twitter.com/${user.data.username}/status/${tweet.id}`)
          .setThumbnail(user.data.image)

          .setColor("RANDOM");

        if (tData.includes) {
          if (tData.includes.media) {
            tData.includes.media.forEach((media) => {
              embed.setImage(media.url);
            })
          }
        }



        const row = new MessageActionRow().addComponents(
          new MessageButton()
            .setStyle("LINK")
            .setLabel("View Tweet")
            .setURL(`https://twitter.com/${user.data.username}/status/${tweet.id}`)
        );

        this.client.channels.cache.get("1005920559944712433").send({ embeds: [embed], components: [row] });
        
      });

    }, time()); // ! Hardcoded value because I don't want to make it a parameter
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
