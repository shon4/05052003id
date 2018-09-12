const Discord = require("discord.js");
const DEFAULTPREFIX = "!m.";
const fs = require("fs")

exports.execute = async (bot, message, args, prefix) => {
           var newprefix = args.slice(1).join(" ")
           if (!message.member.hasPermission("MANAGE_ROLES") && message.author.id !== '262674412912771082') return message.channel.send(":x: ERRORS | You don't have permission to execute this command!")
           if (!newprefix) return message.channel.send(`:x: ERRORS | Please Input New Prefix to Set!`)
           if (newprefix.match("reset")) {
            var PREFIXES = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

            PREFIXES[message.guild.id] = {
                PREFIXES: DEFAULTPREFIX
            };
            fs.writeFile("./prefixes.json", JSON.stringify(PREFIXES), (err) => {
                if (err) console.log(err)
            });
            var embed = new Discord.RichEmbed()
            .setDescription(`:white_check_mark: | Succesfully Set my Prefix Back to \`${DEFAULTPREFIX}\``)
            .setColor(message.guild.member(bot.user).highestRole.color)
            message.channel.send(embed)
            return;
           }

           var PREFIXES = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

           PREFIXES[message.guild.id] = {
               PREFIXES: newprefix
           };

           fs.writeFile("./prefixes.json", JSON.stringify(PREFIXES), (err) => {
               if (err) console.log(err)
           });

           var embed = new Discord.RichEmbed()
           .setDescription(`:white_check_mark: | Succesfully Set Prefix for This Server to \`${newprefix}\``)
           .setColor(message.guild.member(bot.user).highestRole.color)
           message.channel.send(embed)

};

exports.info = {
    name: "prefix",
    alias: [],
    permission: "default",
    type: "adminis",
    usage: "(p)prefix [new prefix]",
    guildOnly: false,
    help: "Set my prefix for some server"
};