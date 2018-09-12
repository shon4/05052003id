 const main = require('../bot.js');
const Discord = require('discord.js');
const cfg = require('../config.js');
exports.execute = (client, message, args) => {
    if(args.length == 1){
        const emoji = (":bookmark:");
        var title = `You have been helped ${emoji}`;
        var msg = "List all commands: " + "`" + `${cfg.config.PREFIX}commands` + "`\n";
        msg += "Info about a command: " + "`" + `${cfg.config.PREFIX}help <command>` + "`\nor " +  "` " +` ${cfg.config.PREFIX}commands here` + "`";

        var embed = new Discord.RichEmbed()
            .setColor(9955331)
             .addField(title, msg)
        message.channel.send(embed);
    }else{
        var cmdName = args[1];
      var none = null
        main.commands().forEach(command => {
            if(cmdName === command.info.name || command.info.alias.includes(cmdName)){
                var embed = new Discord.RichEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`Informations For *${command.info.name}* Commands!`,message.author.displayAvatarURL)
                    .addField(`Description`, "`" +` ${command.info.help}` + "`")
                    .addField("Usage","`" +`${command.info.usage}` + "`")
                    .addField('Aliases' ,`${command.info.alias.join(" ")}` || "`Not Have Aliases`")
                message.channel.send(embed);
                return;
            }
        });
        // if cmdName doesn't match any command
        //message.react("❓");   // needs to wait for forEach to fini
    }
};

exports.info = {
    name: "help",
    alias: [],
    permission: "default",
    type: "hidden",
    guildOnly: false,
    usage: "(p)help [commands]",
    help: "Print help message"
};
