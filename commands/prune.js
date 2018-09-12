const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.execute = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  if(!args[1]) return message.channel.send(`<@${message.author.id}> Please input some value!`).then(msg => msg.delete(5000))
  const clear = new Discord.RichEmbed()
.setAuthor("Server Manager")
.addField(":white_check_mark: Success", `Successfully deleted **${args[1]}** Messages!`)
.addField(":satellite_orbital: Deleted At", `<#${message.channel.id}>`)
  message.channel.bulkDelete(args[1]).then(() => {
    message.channel.send(clear).then(msg => msg.delete(5000));
  });      
                                           
                                           };                                                                                  
exports.info = {
    name: "prune",
    alias: ["clear"],
    permission: "default",
    type: "adminis",
    guildOnly: true,
    usage: "(p)prune [ammount]",
    help: "new cmd"
};