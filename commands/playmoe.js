const Discord = require('discord.js');
exports.execute = (client, message, args) => {
  if(!args[1]){
    let help = new Discord.RichEmbed()
    .setAuthor("Playmoe Correct Usage")
    .addField("listen.moe 🇯🇵","please type **!m.playmoe jp** to play listen.moe jpop")
    .addField("listen.moe 🇰🇷","please type **!m.playmoe kr** to play listen.moe kpop")
    .addField("Stop listen.moe","please type **!m.playmoe stop** to stop the current listen.moe")
    .setFooter("Powered by listen.moe","https://imgdb.net/images/4011.png")
    .setColor("RANDOM")
    message.channel.send(help).then(m => m.delete(10000))
  }
  
  if(args[1] == "jp"){
    
        const channel = message.member.voiceChannel;
    if(!channel) return message.channel.send('You must join voiceChannel first');
    channel.join().then(connection => { const dispatcher = connection.playStream('http://listen.moe/opus')})
        
    const jembed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('✅ Successfully Playing **listen.moe** 🇯🇵 in Your Channel!\n')
    .setFooter("Powered by listen.moe","https://imgdb.net/images/4011.png")
    .setTimestamp()
    message.channel.send(jembed)
    .then(connection => console.log('Connected!'))
    .catch(console.error);
    }
    if(args[1] == "kr"){
    
        const channel = message.member.voiceChannel;
    if(!channel) return message.channel.send('You must join voiceChannel first');
    channel.join().then(connection => { const dispatcher = connection.playStream('http://listen.moe/kpop/opus')})
        
    const jembed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('✅ Successfully Playing **listen.moe** 🇰🇷 in Your Channel!\n')
    .setFooter("Powered by listen.moe","https://imgdb.net/images/4011.png")
    .setTimestamp()
    message.channel.send(jembed)
    .then(connection => console.log('Connected!'))
    .catch(console.error);
    }
  if(args[1] == "stop"){
    let channel = message.member.voiceChannel
    if(!channel) return message.channel.send("you must join VoiceChannel first")
    channel.leave()//.then(message.channel.send(L))
    let L = new Discord.RichEmbed()
    .setColor("GREEN")
    .addField("✅ | Stopping",`Stopping current listen.moe songs!`)
    message.channel.send(L)
  }
};

exports.info = {
    name: "playmoe",
    alias: ["pmoe"],
    permission: "default",
    type: "music",
  usage: "(p)join",
    guildOnly: true,
	help: "Make me join to play listen.moe in your voice channel"
};
