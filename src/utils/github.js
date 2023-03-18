const { Octokit } = require("@octokit/core");
const dotenv = require("dotenv");
dotenv.config();
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const octokit = new Octokit({ auth: process.env.github_token });
const Logger = require("./Logger");
const logger = new Logger({ debug: true });

let lastIssue = null;
let lastRelease = null;

class Github {
    constructor(client, usename = process.env.github_owner, repo = process.env.github_repo) {
        this.client = client;
        this.username = usename;
        this.repo = repo;
    }

    // ! Normal functions

    async getIssues() {
        const issues = await octokit.request("GET /repos/{owner}/{repo}/issues", {
            owner: this.username,
            repo: this.repo,
        });

        if (issues.status !== 200) return null;
        if (issues.data.length === 0) return "No issues found";

        return issues.data;
    }

    async getIssue(number) {
        const issue = await octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}", {
            owner: this.username,
            repo: this.repo,
            issue_number: number,
        });

        if (issue.status !== 200) return null;

        return issue.data;
    }

    async getLatestRelease() {
        const releases = await octokit.request("GET /repos/{owner}/{repo}/releases", {
            owner: this.username,
            repo: this.repo,
        });

        if (releases.status !== 200) return null;
        if (releases.data.length === 0) return "No releases found";

        return releases.data[0];
    }

    // ! Embed functions (For discord)

    // async publishRelease(channel = "1055707718423416832", color = "#0379FF", title = "New release!", message = "A new release has been published on github!", isInDevelopment = true) {
        
    //     const getTime = () => {
    //         if (isInDevelopment) return 2000; // 2 seconds
    //         return 300000; // 5 minutes
    //     };

    //     setInterval(async () => {
    //         const release = await this.getLatestRelease();
            
    //         if (!release) return;
            
    //         const check = await this.client.channels.fetch(channel).then((channel) => {
    //             let messages;
            
    //             try {
    //                 messages = channel.messages.cache;
    //             }
    //             catch (err) {
    //                 return;
    //             }
            
    //             if (messages.size === 0) return;
            
    //             const lastMessage = messages.last();
    //             if (lastMessage.content.includes(release.tag_name)) return "Already published"; //? I think this is the best way to check if the release has already been published
            
    //             return false;
    //         })
        
    //         if (check === "Already published") return;
        
    //         logger.log(`New release published on github!`, "github");
        
    //         const body = release.body.replace(/\r\n/g, "\n").split("\n");

    //         const dateToTimestamp = Math.floor(new Date(release.created_at).getTime() / 1000);
    //         let newBody = "";
        
    //         for (let i = 0; i < body.length; i++) {
    //             const line = body[i];
            
    //             if (line.startsWith("*")) {
    //                 newBody += `${line.replace("*", ">").replaceAll("*", "")}\n`;
    //             }
    //             else {
    //                 newBody += `${line.replace(/\*/g, "-")}\n`;
                
    //             }
    //         }
        
    //         const embed = new MessageEmbed()
    //             .setColor(color)
    //             .setTitle(title)
    //             .setDescription(newBody)
    //             .addFields(
    //                 { name: "Date Created", value: `<t:${dateToTimestamp}:F>`, inline: true },
    //             )
    //             .setAuthor(
    //                 {
    //                     name: release.author.login,
    //                     iconURL: release.author.avatar_url,
    //                     url: release.author.html_url,
    //                 }
    //             )
    //             .setTimestamp()
    //             .setFooter(release.tag_name);
        
    //         const button = new MessageButton()
    //             .setStyle("LINK")
    //             .setLabel("View release")
    //             .setURL(release.html_url);
        
    //         const row = new MessageActionRow().addComponents(button);
        
    //         this.client.channels.cache.get(channel).send({ embeds: [embed], components: [row], content: message + "\n" + release.tag_name });
    //     }, getTime());
    // }
}

module.exports = Github;