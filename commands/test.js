const Discord = require('discord.js')
exports.execute = async(client, message, args) => {
//const errors = require('./utils/errors.js')
//message.delete();
  //if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
 // let botmessage = args.slice(1).join(" ");
  //message.channel.send(botmessage.replace(/\$user/g, message.author.username).replace(/\$server/g, message.guild.name)).then(x => x.delete(5000))
var cl = new Discord.RichEmbed()
.setColor("GREEN")
.setAuthor("❗Latest Changelog Update [12/9/2018]")
.addField("✅ Actions :", `• Added \`lyrics\` Commands (helped by Sharif#2769 and OwO#8287)\n• Added \`profile\` Commands (Beta)\n• Added \`daily\` Commands\n• Added \`rep\` Commands\n`)//• Added \`music\` Commands Back!`)
.addField("⛔ Actions :",`• No Changes`)
.addField(":beetle: Fixed :", `• Fixed on \`daily\` Commands`)
.setFooter("Found some bug? !m.bugreport <bug>")
message.channel.send(cl)
  
};

exports.info = {
    name: "changelog",
    alias:["cl"],
    permission: "default",
    type: "general",
    guildOnly: false,
    usage: "(p)changelog",
    help: "showing all update proggress"
};