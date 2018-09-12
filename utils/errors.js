const Discord = require("discord.js");
const fs = require("fs");
let config = require("../config.js");

module.exports.noPerms = (message, perm) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setTitle("Insufficient Permission")
        .setColor("RED")
        .addField("Permission needed", perm);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.equalPerms = (message, user, perms) => {

    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor("RED")
        .setTitle("ERROR")
        .addField(`${user} has perms`, perms);

    message.channel.send(embed).then(m => m.delete(5000));

}

module.exports.botuser = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle("ERROR")
        .setDescription("You cannot ban a bot.")
        .setColor("RED");

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.cantfindUser = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("ERROR")
        .setDescription("Could not find that user.")
        .setColor("RED");

    channel.send(embed).then(m => m.delete(5000));
}

module.exports.noReason = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("ERROR")
        .setDescription("Please supply a reason.")
        .setColor("RED");

    channel.send(embed).then(m => m.delete(5000));
}