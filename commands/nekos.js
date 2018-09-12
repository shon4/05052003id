
const Discord = require('discord.js')
const superagent = require('superagent')
exports.execute = async (client, message, args) => {
message.react("✅")
        let {body} = await superagent
    .get(`https://nekos.life/api/lewd/neko`);
    let ensfw = new Discord.RichEmbed()
  .setColor("RED")
  .addField(":x: ERRORS", `<@${message.author.id}> You Must Doing This At **NSFW** Channel!`)
    if (!message.channel.nsfw) return message.channel.send(ensfw);
  
    let hentaiEmbed = new Discord.RichEmbed()
    .setAuthor("🔞 | Nekopoi Is Your Mood?", message.author.displayAvatarURL)
    .setTimestamp()
    .setImage(body.neko)
    .setColor(message.guild.member(client.user).highestRole.color)
    .setFooter(`•  Requested By: ${message.author.tag}`);
    message.channel.send(hentaiEmbed);

};

exports.info = {
    name: "nekos",
    alias: ["nsfw"],
    permission: "default",
    type: "nsfw",
  usage: "(p)nekos",
    guildOnly: false,
    help: "new cmd"
};