const Discord = require("discord.js")
const fs = require("fs");

exports.execute = async(bot, message, args) => {
               var option = args.slice(1).join(" ")
            if (!option) {
              var embed = new Discord.RichEmbed()
              .setDescription(`
**Correct Usage:**
- \`!m.welcome set [#channel]\`
- \`!m.welcome [on/off]\`
**Example:**
- \`!m.welcome set #welcome&leaving\`
**After do that enable it**
- \`!m.welcome on\`
`)
              .setColor(message.guild.member(bot.user).highestRole.color)
              .setTimestamp()
              .setFooter(`• Requested By: ${message.author.tag}`)
              message.channel.send({embed});
            } else {
              if (option.match("set")) {
            var nick = JSON.parse(fs.readFileSync("./welcomechannel.json", "utf8"))
            if (!message.member.hasPermission("MANAGE_CHANNELS") && message.author.id !== '262674412912771082') return message.channel.send(`**🔒 | ${message.author} Sorry, But You Need \`MANAGE CHANNELS\` Permissions To Use This Command!**`);
                
            var inputmessage = message.mentions.channels.first()
            if (args[0]) {
              nick[message.guild.id] = {
                nick: inputmessage.id
             };
              fs.writeFile("./welcomechannel.json", JSON.stringify(nick), (err) => {
                if (err) console.log(err)
             });
              
              var embed = new Discord.RichEmbed()
              .setDescription(`:white_check_mark: | Succesfully Set **Welcome & Leaving** Channels To **${inputmessage}**.`)
              .setTimestamp()
              .setColor(message.guild.member(bot.user).highestRole.color)
              .setFooter(`• Requested By: ${message.author.tag}`)
              
              message.channel.send({embed});
            }
            }
            }
                if (option.match("picture")) {
            var welcomeimg = JSON.parse(fs.readFileSync("./welcomechannel.json", "utf8"))
           if (!message.member.hasPermission === "MANAGE_CHANNELS" || message.author.id !== '262674412912771082') return message.channel.send(`**🔒 | ${message.author} Sorry, But You Need \`MANAGE CHANNELS\` Permissions To Use This Command!**`);
            var inputmessage = args.slice(2).join(" ")
            if (args[1]) {
              welcomeimg[message.guild.id] = {
                nick: inputmessage
             };
              fs.writeFile("./welcomechannel.json", JSON.stringify(welcomeimg), (err) => {
                if (err) console.log(err)
             });
              
              var embed = new Discord.RichEmbed()
              .setDescription(`:white_check_mark: | I Set The **Welcome Picture** Channels To **${inputmessage}**.`)
              .setTimestamp()
              .setColor(message.guild.member(bot.user).highestRole.color)
              .setFooter(`• Requested By: ${message.author.tag}`)
              
              message.channel.send({embed});
            }
            }
  
            if (option.match("on")) {
            var welcomesetting = JSON.parse(fs.readFileSync("./welcomestatus.json", "utf8"));
            welcomesetting[message.guild.id] = {
                checker: 1
                };
                  fs.writeFile("./welcomestatus.json", JSON.stringify(welcomesetting, null, 2), (err) => {
                    console.error(err)
                 })
                var embed = new Discord.RichEmbed()
                .setColor(message.guild.member(bot.user).highestRole.color)
                .setDescription(`:white_check_mark: | **Enabled** Welcome & Leaving Status.`)
                .setTimestamp()
                .setFooter(`• Requested By: ${message.author.tag}`)
                
                message.channel.send({embed});
            }
            if (option.match("off")) {
            var welcomesetting = JSON.parse(fs.readFileSync("./welcomestatus.json", "utf8"));
            welcomesetting[message.guild.id] = {
                checker: 0
                };
                  fs.writeFile("./welcomestatus.json", JSON.stringify(welcomesetting, null, 2), (err) => {
                    console.error(err)
                 })
                var embed = new Discord.RichEmbed()
                .setColor(message.guild.member(bot.user).highestRole.color)
                .setDescription(`:white_check_mark: | **Disabled** Welcome & Leaving Status.`)
                .setTimestamp()
                .setFooter(`• For: ${message.author.tag}`)
                
                message.channel.send({embed});
            }
            if (option.match("previous")) {
              let nick = JSON.parse(fs.readFileSync("./welcomechannel.json", "utf8"));
              if (!nick[message.guild.id]) {
              var embed = new Discord.RichEmbed()
              .setDescription(`**WELCOME:**\n\n\`\`\`None\`\`\``)
              .setColor(message.guild.member(bot.user).highestRole.color)
              return message.channel.send(embed)
             }
              var embed = new Discord.RichEmbed()
              .setDescription(`**WELCOME: **\n\n\`\`\`${nick[message.guild.id].nick}\`\`\``)
              .setColor(message.guild.member(bot.user).highestRole.color)
              return message.channel.send(embed); 
            }


};

exports.info = {
    name: "welcome",
    alias: [],
    permission: "default",
    type: "adminis",
  usage: "(p)welcome set [#channel]  \n(p)welcome [on/off]",
    guildOnly: false,
    help: "Welcome and Farrawells Feature"
};
