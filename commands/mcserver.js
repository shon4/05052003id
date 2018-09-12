const Discord = require('discord.js')
exports.execute = (client, message, args) => {
  if(args.length < 2) return message.reply('Please type some query!');
  if(args.slice(1).join(' ').length > 30) return message.reply('You add so many word');
  let rnd = Math.floor((Math.random() * 39) + 1);
  const args1 = message.content.split(" ").slice(1).join(" ")
  const image = new Discord.Attachment(`http://mcapi.us/server/image?ip=${args1}&title=${args1}&theme=dark`, "server.png");
    message.channel.send(image)
};

exports.info = {
    name: "mcserver",
    alias: ["mcs"],
    permission: "default",
    type: "fun",
    guildOnly: false,
  usage: "(p)mcserver [ip address]",
    help: "Get Minecraft server status"
};