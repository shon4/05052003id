const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.execute = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "MANAGE_ROLES");
 
  
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user, yo.");
  var role = args.slice(2).join(" ");
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Couldn't find that role.");

  if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");
  await(rMember.removeRole(gRole.id));

  
    let gavt = message.guild.iconURL
    let uavt = message.author.displayAvatarURL
    let cavt = message.client.displayAvatarURL
    var addrole = new Discord.RichEmbed()
    .setAuthor("Server Manager", uavt)
    .setThumbnail(gavt)
    .addBlankField(true)
    .addField("Roles Removed From" ,`<@${rMember.id}>`)
    .addField("Deleted Roles", "```js\n" + `${gRole.name}` + "```")
    .addField("Removed By",`<@${message.author.id}>`)
    .setColor("RED")
    .setFooter("Successfully Removed", cavt)
    .setTimestamp()
    message.channel.send(addrole)
  

  };
  

exports.info = {
    name: "removerole",
    alias: ["delrole"],
    permission: "default",
    type: "adminis",
  usage: "(p)removerole @user [role]",
    guildOnly: false,
    help: "new cmd"
};