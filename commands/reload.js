const Discord = require("discord.js")
const fs = require("fs");

exports.execute = async (bot, message, args) => {
  args = args.slice(1)
  let embed = new Discord.RichEmbed()
  .setTitle("Reload")
  .setDescription("Sorry, the `reload` command can only be executed by the Developer.")
  .setColor("#ec0000");
  if(!args || args.size < 1) return message.channel.send("❌ | Please Include The Command That You Want To Reload Too!");
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  message.channel.send(`✅ | ${message.author}, Succesfully **Reload** \`${args[0]}\` Commands.`);

/*};
    return message.channel.send({ embed: { color: 0x09ed2b, description: `✅ Succesfully Reloading **${args[1]}.js**`}})
     }catch(e){
       let err = new Discord.RichEmbed()
       .setColor("RED")
       .addField("❌ Unable To Reload",`Unable to reload ${args[1]} \nReason: \`${e.message}\``)
     return message.channel.send(err)//{ embed: { color: 0xed1809, description:`Unable to reload ${args[1]}`}})
     }*/
}; 


exports.info = {
    name: "reload",
    alias: ["rel"],
    permission: "admin",
    type: "admin",
  usage: "(p)reload [commands]",
    guildOnly: false,
    help: "new cmd"
};