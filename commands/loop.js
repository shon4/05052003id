//const { queue } = require('../commands/playowo.js');
const Discord = require('discord.js')
exports.execute = async (client, msg, args) => {
 /* const serverQueue = client.queue.get(msg.guild.id);
		if(!serverQueue) return msg.channel.send('Not playing anything right now');
  serverQueue.loop = !serverQueue.loop
  //client.queue.set(msg.guild.id, serverQueue) 
 if(serverQueue.loop) return msg.channel.send ("loop on")
  else{
    if(!serverQueue.loop)return msg.channel.send("loop off")  
  // cobain*/
//  var loop = new Discord.RichEmbed()
 // .setDescription("🔁 **Enable**")
 // var unloop = new Discord.RichEmed()
//  .setDescription("🔁 **Disable**")
  const serverQueue = client.queue.get(msg.guild.id);
	if (!msg.member.voiceChannel) return msg.channel.send('You must join voice channel first');
	if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send(`You must be in **${serverQueue.voiceChannel.name}** to loop the queue`);
	if(!serverQueue) return msg.channel.send('Are you sure? nothing to loop because queue is empty');
	try{
    const loop = new Discord.RichEmbed()
    //.setDescription("🔁 **Enable**")
    .setColor("RANDOM")
    .addField("🔁 | Enable", "Looping The current queue!")
    const unloop = new Discord.RichEmbed()
   // .setDescription("🔁 **Disable**")
    .setColor("RED")
    .addField("🔁 | Disable","Unlooping the current queue!")
		serverQueue.loop = !serverQueue.loop;
		if(serverQueue.loop) return msg.channel.send(loop)
		return msg.channel.send(unloop)
	}catch(e){
		return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
	}
  
  }

exports.info = {
    name: "loop",
    alias: [],
    permission: "default",
    type: "music",
    guildOnly: true,
    usage: "(p)loop",
    help: "looping the queue"
};