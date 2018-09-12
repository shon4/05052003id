const Discord = require('discord.js');
const cfg = require('../config.js')
exports.execute = async(client, message, args) => {
    var generalCommands = "";
    var musicCommands = "";
    var funCommands = "";
    var adminCommands = "";
    var modCommands = "";
    var nsfwCommands = "";
  var utilCommands = "";
  var betaCommands = "";
  
  
    client.commands.forEach(command => {
        switch(command.info.type){
            case "general":
                generalCommands += " `" + command.info.name  + "` ";
                break;

            case "music":
                musicCommands += " `" + command.info.name  + "` ";
                break;

            case "fun":
                funCommands += " `" + command.info.name  + "` ";
                break;

            case "admin":
                adminCommands += " `" + command.info.name  + "` ";
                break;
            case "adminis":
                modCommands += " `" + command.info.name + "` ";
                break;
            case "nsfw":
                nsfwCommands += " `" + command.info.name + "` ";
                break;
          case "util":
            utilCommands += " `" + command.info.name + "` ";
            break;
          case "beta":
            betaCommands += " `" + command.info.name + "` ";
            break;
            
            // ignore hidden commands :^)
        }
    });
  try{
  	
    let bicon3 = client.user.displayAvatarURL
    let bicon = message.author.displayAvatarURL 
    var embed = new Discord.RichEmbed()
        .setColor(9955331)
        .setAuthor("Mitsuha Commands!", bicon) 
        .setThumbnail(bicon3)
    .setDescription("❗for showing additional information\n **`!m.help <commands>`**")
        .addField("💬 | General ", generalCommands + "\n", false)
        .addField("🎶 | Music ", musicCommands + "\n", false)
        .addField("🎉 | Fun ", funCommands + "\n", false)
    .addField("💢 | Utility ", utilCommands +"\n",false)
         .addField(":underage: | NSfW ", nsfwCommands + "\n",false)
    .addField("🔪 | Beta Tester", betaCommands +"\n",false)
        .addField(":warning: | Moderation ", modCommands + "\n",false)
         .setFooter("Version 1.0.1", bicon3)
        .setTimestamp()
    if(args[1] === 'here') return message.channel.send(embed);
        if(message.author.id ===  '262674412912771082') embed.addField("🔒 | Owner Only", adminCommands + "\n", false);
		  await message.author.send(embed);
		    await message.channel.send(`<@${message.author.id}> Please check your Private Message :mailbox: or `+ "`" +`${cfg.config.PREFIX}` + "commands here" + "`")
} catch (e) {
  console.log(e.stack)
    message.channel.send(embed);
   message.channel.send("```js\n" +"❎ Error While Sending a Private Message to You, Probably you disable it!" + "```")
  //message.channel.send(e.message)
}
  
  
  };
  

exports.info = {
    name: "commands",
    alias: ["cmds", "cmd", "c"],
    permission: "default",
    type: "hidden",
  usage: "(p)commands or (p)commands here",
    guildOnly: false,
	help: "Print all commands"
};