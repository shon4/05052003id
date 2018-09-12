const Discord = require('discord.js')
const cfg = require('../config.js');
const moment= require("moment")
exports.execute = (client, message, args) => {
const emj = client.emojis.find("name","Gon"); 
      const emj2 = client.emojis.find("name","Gidle"); 
      const emj3 = client.emojis.find("name","Gdnd"); 
      const emj4 = client.emojis.find("name","Goff"); 
      const status = {
  online: `• ${emj} Online`,
  idle: `• ${emj2} Idle`,
  dnd: `• ${emj3} Do Not Disturb`,
  offline: `• ${emj4} Offline/Invisible`,
  
};

const rembed = new Discord.RichEmbed()
.addField(":x: ERROR", "You did not mention a member to display their info?")


         let emoji11 = "https://media.tenor.com/images/b51a0badbe4de2d071efd50398085b6b/tenor.gif";
  let bavt = client.user.displayAvatarURL;
 let o = message.mentions.members.first()//toString() //|| message.author.toString()
// if(message.mentions.members.size < 1) o = message.author;
 if (!o) return message.channel.send(rembed);
  const membed = new Discord.RichEmbed()
  .setAuthor("User Info")
  .setDescription(`\n\n**[Avatar Download](${o.user.displayAvatarURL})**`)
  .setThumbnail(o.user.displayAvatarURL)
  .addBlankField(true)
  .addField(":label: | Name", `• ${o.user.tag}` + " • (" + o.user.id + ")")
  .addField(":pencil:  | Nicknames", `• ${o.nickname === null ? "Nicknames Not Provided" : o.nickname}`)
  .addField(":bar_chart: | Status", `${status[o.presence.status]}`)
  .addField(`:arrow_double_up: | Highest Roles` , `• ${o.highestRole}`)
  .addField(`:inbox_tray: | Joined at:` ,  "• " + moment.utc(o.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss'))
 .addField(`:pencil2: | Acc Created At:`, "• " + moment.utc(o.user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss'))
  .addField(`:video_game: | Game` , `• ${o.presence.game === null ? "Not Playing Anything" :  o.presence.game.name}`)
  .addField(`:pushpin: | Roles` , `• ${o.roles.map(g => `${g.toString()}`).join(" | ")}`)
  .setColor("RANDOM")
  .setFooter(`For : ${message.author.tag}`, bavt)
  .setTimestamp()
  message.channel.send(membed);

};

exports.info = {
    name: "userinfo",
    alias: ["uinfo"],
    permission: "default",
    type: "general",
  usage: "(p)userinfo or (p)userinfo @someone",
    guildOnly: false,
	help: "Displays the userinfo of the user you mentioned"
};