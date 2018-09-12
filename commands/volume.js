exports.execute = async (client, msg, args) => {
  args = args.slice(1)
	const serverQueue = client.queue.get(msg.guild.id);
	if (!msg.member.voiceChannel) return msg.channel.send('You must join voice channel first');
	if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send(`You must be in **${serverQueue.voiceChannel.name}** to change the volume`);
	if(!serverQueue) return msg.channel.send('Are you sure? queue is empty !');
	try{
		if(!args.length) return msg.channel.send(`🔈Current volume is ${serverQueue.volume}%`);
		//args[0].replace('%', '');
    args[0].replace('/\%/g', '')
		if(isNaN(args[0])) return msg.channel.send('Please input valid number >:(');
		if(args[0] > 100) return msg.channel.send('Volume only can be set in range 10 - 100');
    if(args[0] < 10) return msg.channel.send("Volume only can be set in range 10 - 100")
		serverQueue.volume = args[0];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
		return msg.channel.send(`✅ Set volume to **${args[0]}%**`);
	}catch(e){
		return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
	}
}
exports.info ={
  name:"volume",
  alias: ["v"],
  permission:"default",
  type:"music",
  guildOnly:true,
  
  usage:"(p)volume [1-100]",
  help:"set volume for music"
}