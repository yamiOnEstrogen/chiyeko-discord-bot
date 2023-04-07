module.exports = {
    memberRole: "1091906241552465971", //? member role (../events/guildMemberAdd.js)
    welcomeChannel: "1091914863720280125", //? welcome channel (../events/guildMemberAdd.js)
    guildID: "1091905976619249724", //? guild id (GLOBAL)
    verifyChannel: "1092203257071411200", //? verify channel (../events/messageCreate.js)
    levelRoles: [
        {
            level: 1,
            id: "1091907578084200580"
        },
        {
            level: 10,
            id: "1091907867159838842"
        },
        {
            level: 25,
            id: "1091907995048353843"
        },
        {
            level: 45,
            id: "1091908097506811954"
        },
        {
            level: 65,
            id: "1091908158584262666"
        },
        {
            level: 100,
            id: "1091908234354368552"
        }
    ], //? level roles (../events/messageCreate.js)
    prefix: "c.", //? prefix (GLOBAL)
    claimableRoles: [
        {
            emoji: "⭕",
            id: "1091907517627519007",
            style: "SECONDARY",
            type: "pronouns"
        },
        {
            emoji: "🦉",
            id: "1091907448161456168",
            style: "DANGER",
            type: "pronouns"
        },
        {
            emoji: "👨",
            id: "1091907312161140836",
            style: "PRIMARY",
            type: "pronouns"
        },
        {
            emoji: "👩",
            id: "1091907234767839343",
            style: "SUCCESS",
            type: "pronouns"
        },
        {
            emoji: "🔐",
            id: "1091906181120938035",
            style: "DANGER",
            type: "dmstatus"
        },
        {
            emoji: "🔒",
            id: "1091906109486403754",
            style: "PRIMARY",
            type: "dmstatus"
        },
        {
            emoji: "🔓",
            id: "1091906000438706197",
            style: "SUCCESS",
            type: "dmstatus"
        },
        {
            emoji: "🤖",
            id: "1091906621287956590",
            style: "DANGER",
            type: "ping"
        },
        {
            emoji: "🎉",
            id: "1091906560072106004",
            style: "SUCCESS",
            type: "ping"
        },
        {
            emoji: "🐦",
            id: "1091906489729433682",
            style: "PRIMARY",
            type: "ping"
        },
        {
            emoji: "🎥",
            id: "1091906351178985482",
            style: "SUCCESS",
            type: "ping"
        },
    ], //? claimable roles (../events/messageCreate.js, ../events/interactionCreate.js)
}
