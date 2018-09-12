const Discord = require('discord.js')
exports.execute = (client, message, args) => {
  if(args.slice(1).join(' ').length < 1) return message.reply('Please input an username!');
  const arg = message.content.split(" ").slice(1).join(" ")
  const image = new Discord.Attachment(`https://lemmmy.pw/osusig/sig.php?colour=hexc246f2&uname=${arg}&pp=1&countryrank&flagshadow&flagstroke&darkheader&darktriangles&opaqueavatar&avatarrounding=4&rankedscore&onlineindicator=undefined&xpbar&xpbarhex`, "osu.png")
  message.channel.send(image)
};

exports.info = {
    name: "osu",
    alias: [],
    permission: "default",
    type: "fun",
  usage: "(p)osu [username]",
    guildOnly: false,
    help: "Get your osu stats!"
};