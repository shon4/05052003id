const Discord = require('discord.js')
exports.execute = (client, message, args) => {
  if(args.length < 2) return message.reply('Please type some query!');
  if(args.slice(1).join(' ').length > 19) return message.reply('You add so many word');
  let rnd = Math.floor((Math.random() * 39) + 1);
  const args1 = message.content.split(" ").slice(1).join(" ")
  const image = new Discord.Attachment(`https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=Achievement+Get%21&t=${args1}`, "Achievement.png");
    message.channel.send(image)
};

exports.info = {
    name: "mcsay",
    alias: [],
    permission: "default",
    type: "fun",
  usage: "(p)mcsay [args]",
    guildOnly: false,
    help: "Get custom minecraft achievement Message"
};