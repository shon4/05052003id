const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.execute = async (bot, message, args) => {
    message.delete();
    if(!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");
    
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return errors.cantfindUser(message.channel);
    if(bUser.id === bot.user.id) return errors.botuser(message); 
    let bReason = args.slice(2).join(" ");
    if(!bReason) return errors.noReason(message.channel);
    if(bUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, bUser, "MANAGE_MESSAGES");

    let banEmbed = new Discord.RichEmbed()
    .setAuthor("Server Manager")
    .setColor("ORANGE")
    .addField("Banned User", `<@${bUser.id}>`)
    .addField("Banned By", `<@${message.author.id}> `)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt.toString())
    .addField("Reason", bReason);

    message.guild.member(bUser).ban(bReason);
    message.channel.send(banEmbed);

};

exports.info = {
    name: "ban",
    alias: [],
  usage: "(p)ban @user [reason]",
    permission: "default",
    type: "adminis",
    guildOnly: false,
    help: "new cmd"
};