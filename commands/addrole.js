const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const cfg = require("../config.js")

module.exports.execute = async (bot, message, args) => {

  
  if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "MANAGE_ROLES");
  
  var rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!rMember) return errors.cantfindUser(message.channel);
  let role = args.slice(2).join(" ");
  if (!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find("name", role);
  if (!gRole) return message.reply("Couldn't find that role.");

  if (rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
  await (rMember.addRole(gRole.id));

  
  
    let gavt = message.guild.iconURL
    let uavt = message.author.displayAvatarURL
    let cavt = message.client.displayAvatarURL
    var addrole = new Discord.RichEmbed()
    .setAuthor("Server Manager", uavt)
    .setThumbnail(gavt)
    .addBlankField(true)
    .addField("Roles Added to" ,`<@${rMember.id}>`)
    .addField("User Get Roles", "```js\n" + `${gRole.name}` + "```")
    .addField("Added By",`<@${message.author.id}>`)
    .setColor("GREEN")
    .setFooter("Successfully Added", cavt)
    .setTimestamp()
    message.channel.send(addrole)
  
  };
  

exports.info = {
    name: "addrole",
    alias: [],
    permission: "default",
    type: "adminis",
    guildOnly: false,
  usage: "(p)addrole @user [role]",
    help: "new cmd"
};