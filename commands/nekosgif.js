
               

const Discord = require('discord.js')
const superagent = require('superagent')
exports.execute = async (client, message, args) => {
let {body} = await superagent
    .get(`https://nekos.life/api/v2/img/Random_hentai_gif`);
    let ensfw = new Discord.RichEmbed()
  .setColor("RED")
  .addField(":x: ERRORS", `<@${message.author.id}> You Must Doing This At **NSFW** Channel!`)
    if (!message.channel.nsfw) return message.channel.send(ensfw);
  
    let hentaiEmbed = new Discord.RichEmbed()
    .setAuthor("🔞 | Nekopoi Is Your Mood?", message.author.displayAvatarURL)
    .setTimestamp()
    .setImage(body.url)
    .setColor(message.guild.member(client.user).highestRole.color)
    .setFooter(`• Requested By: ${message.author.tag}`);
    message.channel.send(hentaiEmbed);


};

exports.info = {
    name: "nekosgif",
    alias: ["nsfwgif"],
    permission: "default",
    type: "nsfw",
  usage: "(p)nekosgif",
    guildOnly: false,
    help: "new cmd"
};