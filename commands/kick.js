const Discord = require("discord.js");
const errors = require("../utils/errors.js")
module.exports.execute = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.reply("Please mention the name that will be kicked!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) errors.noPerms(message,"MANAGE_MESSAGES");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channe("That person cannot be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setAuthor("Server Manager")
    .setColor("RANDOM")
    .addField("Kicked User", `${kUser}`)
    .addField("Kicked By", `<@${message.author.id}>`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

  

    message.guild.member(kUser).kick(kReason);
    message.channel.send(kickEmbed);
}

exports.info = {
    name: "kick",
    alias: [],
    permission: "default",
    type: "adminis",
    guildOnly: false,
    usage: "(p)kick @user [reason]",
    help: "Kick User From Your Server"
}