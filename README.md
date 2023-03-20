# Chiyeko

![Logo](/.github/842699899b05545dd9af86bc2a5965b9.jpg)


This is a the discord bot for the **AI VTUBER** I made.


<details>
  <summary>Table of Contents</summary>
  <ul>
    <li><a href="#about">About</a></li>
    <li><a href="#links">Links</a></li>
    <li><a href="#developers--contributors">Developers / Contributors</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#run-locally">Run Locally</a></li>
    <li><a href="#how-to-run-this-project">How to run this project</a></li>
    <li><a href="#support">Support</a></li>
  </ul>
</details>


## About
> Chiyeko is an up-and-coming AI Vtuber who is eagerly anticipated by fans all over the world. Developed and maintained by the skilled team at https://unfatal.xyz, Chiyeko is a sophisticated AI who was crafted using a combination of Python, Rust, and some Java.
> Despite not yet having streamed, Chiyeko has already generated quite a bit of buzz in the virtual world. As a passionate Osu player, she has already garnered a following among gaming enthusiasts, who are eagerly awaiting her first stream. With her friendly demeanor and engaging personality, it's clear that Chiyeko is destined for greatness as a virtual streamer.
> As she prepares for her debut, Chiyeko can be found honing her gaming skills and interacting with fans on social media. With her unique blend of talent and charm, it's only a matter of time before she takes the virtual world by storm. Be sure to keep an eye out for her upcoming streams - you won't want to miss a minute of the action!

## Links

[![twitch](https://img.shields.io/badge/twitch-A020F0?style=for-the-badge&logo=twitch&logoColor=white)](https://twitch.tv/chiyekotheai)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/chiyekovt)
[![discord](https://img.shields.io/badge/discord-5539cc?style=for-the-badge&logo=discord&logoColor=white)](TBT)
[![reddit](https://img.shields.io/badge/reddit-ff4500?style=for-the-badge&logo=reddit&logoColor=white)](https://www.reddit.com/r/chiyekovtuber/)


## Developers / Contributors

- [@KiyoDeveloper](https://twitter.com/KiyoDeveloper)



## License

[MIT](https://choosealicense.com/licenses/mit/)


## Run Locally

Clone the project

```bash
  git clone https://github.com/kiyolol/chiyeko-discord-bot
```

Go to the project directory

```bash
  cd chiyeko-discord-bot
```

Install dependencies

```bash
  npm install
```

Deploy the bot (Discord Slash Commands)

```bash
  npm run deploy
```

Start the bot

```bash
  npm run start
```

## How to run this project

*   **.env**
    ## Misc Stuff
    *   `db` - The database url || [LINK](https://www.mongodb.com/)
    ## Twitter Stuff
    *  `api_key` - The API key for twitter || [LINK](https://developer.twitter.com/en/portal/dashboard)
    ## Discord Stuff
     *   `token` - The token to be used for the bot || [LINK](https://discord.com/developers/applications)
    *  `redirect_uri` - The redirect uri for discord oauth2 || [LINK](https://discord.com/developers/applications)
    *  `secret` - The secret for discord oauth2 || [LINK](https://discord.com/developers/applications)
    * `staffRole` - The role that will be pinged when someone opens a ticket || [LINK](https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-)
    * `ticketParent` - The parent category for the tickets (Create a category and put the ID here) || [LINK](https://support.discord.com/hc/en-us/articles/360028038352-Channel-Categories-101)
    * `supporterRole` - The role that will be given to supporters || [LINK](https://wwww.chiyeko.xyz/donate)
    * `logChannel` - The channel where the logs will be sent || [LINK](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)
    ## Github Stuff
    * `github_token` - The token for the github api || [LINK](https://github.com/settings/tokens)
    * `github_repo` - The repo for the github api || [LINK](https://github.com/kiylol/chiyeko-discord-bot)
    * `github_owner` - The username for the github api || [LINK](https://github.com/kiylol)
    ## Email Stuff
    * `email` - The email address for node mailer || [LINK](https://www.google.com/settings/security/lesssecureapps)
    * `email_password` - The password for node mailer || [LINK](https://www.google.com/settings/security/lesssecureapps)

 
*   **/utils/botconfig.js**
    * `memberRole` - The role to be given to members when they join the server
    * `welcomeChannel` - The channel where the welcome message will be sent
    * `goodbyeChannel` - The channel where the goodbye message will be sent
    * `qotdChannel` - The channel where the question of the day will be sent
    * `qotdRole` - The role that will be pinged when the question of the day is sent
    * `aotdChannel` - The channel where the answer of the day will be sent
    * `guildID` - The ID of the server


## Support

For support, email [help@chiyeko.xyz](mailto:help@chiyeko.xyz) or join our [Discord Server](https://chiyeko.xyz/discord)
